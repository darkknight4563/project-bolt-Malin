export interface AnalyticsData {
  date: string;
  value: number;
  type: string;
}

export interface EngagementMetrics {
  [key: string]: number;
}

export interface EngagementEvent {
  type: string;
  data?: Record<string, any>;
  timestamp: string;
}