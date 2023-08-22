import { create } from "zustand";

type ModalStore = {
  inputOpen: boolean;
  toggleInput: () => void;
};

export const useModalStore = create<ModalStore>((set, get) => ({
  inputOpen: false,
  toggleInput: () => {
    const current = get().inputOpen;
    set({ inputOpen: !current });
  },
}));