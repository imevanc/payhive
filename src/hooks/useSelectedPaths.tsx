import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useSelectedPaths = () => {
  const [selectedPaths, setSelectedPaths] = useState<
    Record<"home" | "features" | "company" | "login", boolean>
  >({
    home: true,
    features: false,
    company: false,
    login: false,
  });
  const pathname = usePathname();

  useEffect((): void => {
    switch (pathname) {
      case "/":
        setSelectedPaths({
          home: true,
          features: false,
          company: false,
          login: false,
        });
        break;
      case "/features":
        setSelectedPaths({
          home: false,
          features: true,
          company: false,
          login: false,
        });
        break;
      case "/company":
        setSelectedPaths({
          home: false,
          features: false,
          company: true,
          login: false,
        });
        break;
      case "/login":
        setSelectedPaths({
          home: false,
          features: false,
          company: false,
          login: true,
        });
        break;
    }
  }, [pathname]);
  return { selectedPaths };
};
