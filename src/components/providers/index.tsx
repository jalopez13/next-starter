import { ReactNode } from "react";

import { ThemeProvider } from "./theme";

type PropsType = {
  children: ReactNode;
};

export const Providers = ({ children }: PropsType) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
