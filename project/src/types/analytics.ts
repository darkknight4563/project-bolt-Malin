export interface AnalyticsEvent {
    eventType: string;
    userId?: string;
    timestamp: Date;
    properties: Record<string, any>;
    sessionId: string;
}

export interface UserEngagement {
    userId: string;
    feature: string;
    duration: number;
    startTime: Date;
    endTime: Date;
    completionStatus?: 'completed' | 'abandoned';
}

export interface WellnessMetrics {
    userId: string;
    metricType: 'mood' | 'anxiety' | 'sleep' | 'exercise';
    value: number;
    timestamp: Date;
    notes?: string;
}

export interface FeatureUsage {
    featureId: string;
    userId: string;
    usageCount: number;
    lastUsed: Date;
    totalDuration: number;
}