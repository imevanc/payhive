"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AuthWrapperProps } from "@/types";
import { PROTECTED_ROUTES } from "@/constants";

const isProtectedRoute = (pathname: string): boolean =>
  PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export const AuthWrapper = ({
  children,
  requireAuth = false,
  redirectTo = "/sign-in",
}: AuthWrapperProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const { callbackUrl } = useParams();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" && isProtectedRoute(pathName)) {
      const signInUrl = `${redirectTo}?callbackUrl=${encodeURIComponent(pathName)}`;
      router.push(signInUrl);
      return;
    }

    if (
      status === "authenticated" &&
      (pathName === "/sign-in" || pathName === "/sign-up")
    ) {
      router.push("/profile");
    }
  }, [session, status, router, pathName, requireAuth, redirectTo, callbackUrl]);

  if (status === "loading") {
    return <div className="pt-44 text-9xl text-green-600">LOADING</div>;
  }

  if (status === "unauthenticated" && isProtectedRoute(pathName)) {
    return <div className="pt-44 text-9xl text-green-600">LOADING</div>;
  }

  if (
    status === "authenticated" &&
    (pathName === "/sign-in" || pathName === "/sign-up")
  ) {
    return <div className="pt-44 text-9xl text-green-600">LOADING</div>;
  }

  return <>{children}</>;
};
