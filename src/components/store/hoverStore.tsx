import { create } from "zustand";

type HoverStore = {
  content: string;
  setContent: (content: string) => void;
}

export const useHoverStore = create<HoverStore>((set) => ({
  content: "",
  setContent: (content: string) => {
    set({ content });
  },
}));