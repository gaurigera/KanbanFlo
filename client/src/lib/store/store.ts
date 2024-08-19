import { create } from "zustand";
import { Project } from "@/action/dummyData";

export interface Store {
  data: Project;
  setData: (newData: Project) => void;
}

export const initProjectStore = (): Project => {
  return {
    _id: "",
    name: "",
    description: undefined,
    columns: [],
    collaborators: [],
    createdAt: "",
    updatedAt: "",
  };
};

const createProjectStore = (initData: Project) => {
  return create<Store>()((set) => ({
    data: initData,
    setData: (newData: Project) => set({ data: newData }),
  }));
};

export default createProjectStore;
