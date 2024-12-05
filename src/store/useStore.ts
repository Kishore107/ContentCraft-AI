import { create } from 'zustand';
import { GeneratedContent, UserPreferences } from '../types';

interface Store {
  generatedContent: GeneratedContent[];
  userPreferences: UserPreferences;
  isLoading: boolean;
  addContent: (content: GeneratedContent) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  interests: [],
};

export const useStore = create<Store>((set) => ({
  generatedContent: [],
  userPreferences: defaultPreferences,
  isLoading: false,
  addContent: (content) =>
    set((state) => ({
      generatedContent: [content, ...state.generatedContent],
    })),
  updatePreferences: (preferences) =>
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));