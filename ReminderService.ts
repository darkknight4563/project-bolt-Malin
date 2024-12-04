import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Reminder, ScheduleRule, SchedulePattern } from '../types/ReminderTypes';

interface ReminderSettings {
  enabled: boolean;
  reminders: Reminder[];
  notificationMethod: 'browser' | 'email' | 'both';
}

class ReminderService {
  private static instance: ReminderService;
  private checkInterval: number = 60000; // Check every minute
  private intervalId?: number;

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): ReminderService {
    if (!ReminderService.instance) {
      ReminderService.instance = new ReminderService();
    }
    return ReminderService.instance;
  }

  public startReminderService(userId: string): void {
    this.stopReminderService(); // Clear any existing interval
    
    // Start checking for reminders
    this.intervalId = window.setInterval(() => {
      this.checkReminders(userId);
    }, this.checkInterval);
  }

  public stopReminderService(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private async checkReminders(userId: string): Promise<void> {
    try {
      // Get user's reminder settings
      const userRef = collection(db, 'users');
      const q = query(userRef, where('uid', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return;

      const userData = querySnapshot.docs[0].data();
      const settings: ReminderSettings = userData.reminderSettings;

      if (!settings?.enabled) return;

      const now = new Date();

      // Check each reminder
      settings.reminders.forEach(reminder => {
        if (this.shouldTriggerReminder(reminder, now)) {
          this.sendReminder(settings.notificationMethod, reminder.message);
        }
      });
    } catch (error) {
      console.error('Error checking reminders:', error);
    }
  }

  private shouldTriggerReminder(reminder: Reminder, currentDate: Date): boolean {
    if (!reminder.scheduleRule) {
      // Default behavior for reminders without schedule rules
      return this.isDefaultScheduleMatch(reminder, currentDate);
    }

    switch (reminder.scheduleRule.pattern) {
      case 'alternating':
        return this.checkAlternatingPattern(reminder, currentDate);
      case 'progressive':
        return this.checkProgressivePattern(reminder, currentDate);
      case 'cyclic':
        return this.checkCyclicPattern(reminder, currentDate);
      case 'adaptive':
        return this.checkAdaptivePattern(reminder, currentDate);
      default:
        return this.isDefaultScheduleMatch(reminder, currentDate);
    }
  }

  private isDefaultScheduleMatch(reminder: Reminder, date: Date): boolean {
    const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const currentTime = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    return reminder.enabled &&
           reminder.days.includes(currentDay) &&
           this.isTimeToRemind(reminder.time, currentTime);
  }

  private checkAlternatingPattern(reminder: Reminder, date: Date): boolean {
    const { alternatePattern } = reminder.scheduleRule!;
    if (!alternatePattern || alternatePattern.length !== 2) return false;

    const weekNumber = Math.floor(date.getTime() / (7 * 24 * 60 * 60 * 1000));
    const currentPattern = alternatePattern[weekNumber % 2];
    const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];

    return currentPattern.includes(currentDay) && this.isDefaultScheduleMatch(reminder, date);
  }

  private checkProgressivePattern(reminder: Reminder, date: Date): boolean {
    const { startDate, progressionRate } = reminder.scheduleRule!;
    if (!startDate || !progressionRate) return false;

    const startTime = new Date(startDate).getTime();
    const currentTime = date.getTime();
    const weeksSinceStart = Math.floor((currentTime - startTime) / (7 * 24 * 60 * 60 * 1000));
    
    // Calculate frequency based on progression rate
    const baseFrequency = reminder.days.length;
    const currentFrequency = Math.min(
      7,
      Math.floor(baseFrequency * Math.pow(progressionRate, weeksSinceStart))
    );

    // Dynamically adjust days based on current frequency
    const adjustedDays = this.getAdjustedDays(currentFrequency);
    reminder.days = adjustedDays;

    return this.isDefaultScheduleMatch(reminder, date);
  }

  private checkCyclicPattern(reminder: Reminder, date: Date): boolean {
    const { cycleDuration, restPeriod } = reminder.scheduleRule!;
    if (!cycleDuration || !restPeriod) return false;

    const totalCycleDays = cycleDuration + restPeriod;
    const daysSinceStart = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
    const dayInCycle = daysSinceStart % totalCycleDays;

    // Check if we're in an active period
    return dayInCycle < cycleDuration && this.isDefaultScheduleMatch(reminder, date);
  }

  private checkAdaptivePattern(reminder: Reminder, date: Date): boolean {
    // Implement adaptive logic based on user engagement
    // This would typically involve analyzing user interaction data
    return this.isDefaultScheduleMatch(reminder, date);
  }

  private getAdjustedDays(frequency: number): string[] {
    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const spacing = Math.floor(7 / frequency);
    const adjustedDays: string[] = [];

    for (let i = 0; i < frequency; i++) {
      adjustedDays.push(allDays[i * spacing]);
    }

    return adjustedDays;
  }

  private isTimeToRemind(reminderTime: string, currentTime: string): boolean {
    // Compare times, allowing for a 1-minute window
    const [reminderHour, reminderMinute] = reminderTime.split(':').map(Number);
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);

    const reminderMinutes = reminderHour * 60 + reminderMinute;
    const currentMinutes = currentHour * 60 + currentMinute;

    return Math.abs(reminderMinutes - currentMinutes) <= 1;
  }

  private async sendReminder(method: 'browser' | 'email' | 'both', message?: string): Promise<void> {
    if (method === 'browser' || method === 'both') {
      this.sendBrowserNotification(message);
    }

    if (method === 'email' || method === 'both') {
      await this.sendEmailNotification(message);
    }
  }

  private sendBrowserNotification(message?: string): void {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      new Notification('Malin Mental Health', {
        body: message || 'Time for your wellness check-in!',
        icon: '/logo.png',
        badge: '/logo.png',
        tag: 'mood-reminder',
        requireInteraction: true,
        silent: false,
        vibrate: [200, 100, 200],
      });
    }
  }

  private async sendEmailNotification(message?: string): Promise<void> {
    // Implement email notification logic here
    // This would typically involve calling a backend API
    // that handles sending emails with the custom message
    console.log('Email notification would be sent here:', message);
  }
}

export default ReminderService;
