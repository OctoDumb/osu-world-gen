import { create } from "zustand";

export type RegionItem = {
  id: string;
  loading: boolean;
  data?: any;
};

type RegionsStore = {
  data: RegionItem[];
  addEmpty: () => void;
  addBulk: (ids: string[]) => void;
  removeByIndex: (index: number) => void;
  updateAtIndex: (index: number, updateData: Partial<RegionItem>) => void;
  /**
   * Fetch map data by id
   * @param id - can be string osmId or index of element
   */
  fetchById: (id: string | number, redl?: boolean) => Promise<void>;
  /**
   * Fetch maps by all ids stored in data
   * @param id - can be string osmId or index of element
   */
  fetchAll: (redl?: boolean) => Promise<void>;
  removeAll: () => void;
};

export const useRegionsStore = create<RegionsStore>((set, get) => ({
  data: [],
  addEmpty: () => {
    const { data } = get();
    const newElement = {
      id: "",
      loading: false,
    };

    set({ data: [...data, newElement] });
  },
  addBulk: (ids: string[]) => {
    const { data } = get();
    const newElements = ids.map(id => ({
      id,
      loading: false,
    }));

    set({ data: [...data, ...newElements] });
  },
  removeByIndex: (index) => {
    const { data } = get();
    const newData = data.filter((item, i) => i !== index);
    set({ data: newData });
  },
  updateAtIndex: (index, updateData) => {
    const { data } = get();
    const newData = [...data];
    const updatedElement: RegionItem = {
      ...data[index],
      ...updateData,
    };

    newData[index] = updatedElement;
    set({ data: newData });
  },
  fetchById: async (id, redl = false) => {
    const { data, updateAtIndex } = get();

    let currentId: string;
    let index: number;

    if (typeof id === "number") {
      currentId = data[id].id;
      index = id;
    } else {
      currentId = id;
      index = data.findIndex((item) => item.id === id);
    }

    try {
      updateAtIndex(index, { loading: true });
      const response = await fetch(`/map/${currentId}/${Number(redl)}`);
      const raw = await response.json();

      const data = {
        type: "Feature",
        geometry: raw.geometry,
        properties: { id: currentId, names: raw.names },
      };

      updateAtIndex(index, { data });
    } catch (e) {
      console.error(e);
    } finally {
      updateAtIndex(index, { loading: false });
    }
  },
  fetchAll: async (redl = false) => {
    const { data, fetchById } = get();
    const ids = data.map((item) => item.id).filter(Boolean);
    await Promise.all(ids.map((id) => fetchById(id, redl)));
  },
  removeAll: () => {
    set({ data: [] });
  },
}));
