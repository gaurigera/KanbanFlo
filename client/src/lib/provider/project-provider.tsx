"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import createProjectStore, { initProjectStore, Store } from "@/lib/store/store";

export type ProjectStoreApi = ReturnType<typeof createProjectStore>;

export const ProjectStoreContext = createContext<ProjectStoreApi | undefined>(
  undefined
);

export interface ProjectStoreProviderProps {
  children: ReactNode;
}

export const ProjectStoreProvider = ({
  children,
}: ProjectStoreProviderProps) => {
  const storeRef = useRef<ProjectStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createProjectStore(initProjectStore());
  }

  return (
    <ProjectStoreContext.Provider value={storeRef.current}>
      {children}
    </ProjectStoreContext.Provider>
  );
};

export const useProjectStore = <T, > (selector : (store: Store) => T): T => {
  const projectStoreContext = useContext(ProjectStoreContext);

  if (!projectStoreContext) {
    throw new Error("Store Error!");
  }

  return useStore(projectStoreContext, selector);
};
