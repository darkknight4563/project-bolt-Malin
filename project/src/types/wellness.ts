export interface ResourceCategory {
    id: string;
    name: string;
    description?: string;
}

export interface WellnessTool {
    id: string;
    title: string;
    description: string;
    type: 'meditation' | 'exercise' | 'breathing';
    duration_minutes?: number;
    difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
    instructions?: string;
    media_url?: string;
    category_id: string;
    is_active: boolean;
}

export interface Resource {
    id: string;
    title: string;
    description?: string;
    content_type: 'article' | 'video' | 'audio' | 'pdf';
    content?: string;
    external_url?: string;
    author?: string;
    category_id: string;
    tags: string[];
    is_premium: boolean;
    is_active: boolean;
}

export interface UserProgress {
    id: string;
    user_id: string;
    tool_id: string;
    completed_at: Date;
    duration_minutes?: number;
    notes?: string;
    mood_rating?: number;
    effectiveness_rating?: number;
}