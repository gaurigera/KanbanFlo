"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ProjectStoreProvider } from "@/lib/provider/project-provider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ProjectStoreProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </ProjectStoreProvider>
  );
}
