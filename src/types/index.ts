export type ContentType = 'text' | 'image' | 'voice';

export interface GenerationOptions {
  contentType: ContentType;
  prompt: string;
  style?: string;
  tone?: string;
}

export interface UserPreferences {
  theme: string;
  language: string;
  interests: string[];
}

export interface GeneratedContent {
  id: string;
  type: ContentType;
  content: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}