import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export const styleOptions = {
  text: [
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative' },
    { value: 'academic', label: 'Academic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'technical', label: 'Technical' }
  ],
  image: [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: '3d', label: '3D Rendered' }
  ],
  voice: [
    { value: 'natural', label: 'Natural' },
    { value: 'professional', label: 'Professional' },
    { value: 'expressive', label: 'Expressive' },
    { value: 'broadcast', label: 'Broadcast' },
    { value: 'casual', label: 'Casual' }
  ]
};

export const toneOptions = {
  text: [
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'empathetic', label: 'Empathetic' }
  ],
  image: [
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'moody', label: 'Moody' },
    { value: 'cheerful', label: 'Cheerful' },
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'serene', label: 'Serene' }
  ],
  voice: [
    { value: 'confident', label: 'Confident' },
    { value: 'warm', label: 'Warm' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'calm', label: 'Calm' },
    { value: 'authoritative', label: 'Authoritative' }
  ]
};