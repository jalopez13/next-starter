"use client";

import { ReactNode, useState } from "react";

import { getQueryClient } from "./query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type ProviderType = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderType) => {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default Provider;
