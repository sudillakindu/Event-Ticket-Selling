"use client";

import { ReactQueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster richColors position="top-right" />
    </ReactQueryProvider>
  );
}