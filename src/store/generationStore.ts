// in /store/generationStore.ts
import { create } from "zustand";

interface genRes {
  [platform: string]: {
    description: string;
    tags: string[];
  };
}

interface genState {
  results: genRes | null;
  isLoading: boolean;
  error: string | null;
  //function declaration 
  generate: (data: {
    file: File;
    values: { title: string; context?: string };
    socialToggles: Record<string, boolean>;
  }) => Promise<void>;
}

export const useGenerationStore = create<genState>((set) => ({
  results: null,
  isLoading: false,
  error: null,

  // call generateDesc func here
  generate: async (data) => {
    set({ isLoading: true, error: null, results: null }); 
    console.log("Store's generate function called with:", data);
  },
}));
