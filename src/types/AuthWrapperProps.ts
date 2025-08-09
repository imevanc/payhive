import { ReactNode } from "react";

export type AuthWrapperProps = {
  children: ReactNode;
  requireAuth?: boolean;
  requireSubscription?: boolean;
  redirectTo?: string;
};
