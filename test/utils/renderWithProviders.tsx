import { FC, ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { render, RenderOptions } from "@testing-library/react";

const WithSessionProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <SessionProvider session={null}>{children}</SessionProvider>
);

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: WithSessionProvider, ...options });
