"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AuthWrapperProps } from "@/types";
import { PROTECTED_ROUTES } from "@/constants";
import Loading from "@/components/Loading";

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
    console.log("=== AuthWrapper Debug ===");
    console.log("Status:", status);
    console.log("Session:", session);
    console.log("PathName:", pathName);
    console.log("Document cookies:", document.cookie);
    console.log("Is protected route:", isProtectedRoute(pathName));
    console.log("========================");
  }, [session, status, pathName]);

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
    return <Loading />;
  }

  if (status === "unauthenticated" && isProtectedRoute(pathName)) {
    return <Loading />;
  }

  if (
    status === "authenticated" &&
    (pathName === "/sign-in" || pathName === "/sign-up")
  ) {
    return <Loading />;
  }

  return <>{children}</>;
};
