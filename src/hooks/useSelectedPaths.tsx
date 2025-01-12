import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useSelectedPaths = () => {
  const [selectedPaths, setSelectedPaths] = useState<
    Record<"home" | "what-we-offer" | "about-us" | "login", boolean>
  >({
    home: true,
    "what-we-offer": false,
    "about-us": false,
    login: false,
  });
  const pathname = usePathname();

  useEffect((): void => {
    switch (pathname) {
      case "/":
        setSelectedPaths({
          home: true,
          "what-we-offer": false,
          "about-us": false,
          login: false,
        });
        break;
      case "/what-we-offer":
        setSelectedPaths({
          home: false,
          "what-we-offer": true,
          "about-us": false,
          login: false,
        });
        break;
      case "/about-us":
        setSelectedPaths({
          home: false,
          "what-we-offer": false,
          "about-us": true,
          login: false,
        });
        break;
      case "/login":
        setSelectedPaths({
          home: false,
          "what-we-offer": false,
          "about-us": false,
          login: true,
        });
        break;
    }
  }, [pathname]);
  return { selectedPaths };
};
