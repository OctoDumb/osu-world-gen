import { create } from "zustand";

type RegionItem = {
  id: string;
  data: any;
};

type RegionsStore = {
  data: RegionItem[];
  addEmpty: () => void;
  removeByIndex: (index: number) => void;
  updateAtIndex: (index: number, updateData: Partial<RegionItem>) => void;
};

export const useRegionsStore = create<RegionsStore>((set, get) => ({
  data: [],
  addEmpty: () => {
    const { data } = get();
    const newElement = {
      id: "",
      data: {},
    };

    set({ data: [...data, newElement] });
  },
  removeByIndex: (index) => {
    const { data } = get();
    const newData = data.filter((item, i) => i !== index);
    set({ data: newData });
  },
  updateAtIndex: (index, updateData) => {
    const { data } = get();
    const updatedElement: RegionItem = {
      ...data[index],
      ...updateData,
    };

    data[index] = updatedElement;
    set({ data });
  },
}));
