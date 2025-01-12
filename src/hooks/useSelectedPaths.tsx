import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useSelectedPaths = () => {
  const [selectedPaths, setSelectedPaths] = useState<
    Record<"home" | "what-we-offer" | "about-us" | "sign-in", boolean>
  >({
    home: false,
    "what-we-offer": false,
    "about-us": false,
    "sign-in": false,
  });
  const pathname = usePathname();

  useEffect((): void => {
    switch (pathname) {
      case "/":
        setSelectedPaths({
          home: true,
          "what-we-offer": false,
          "about-us": false,
          "sign-in": false,
        });
        break;
      case "/what-we-offer":
        setSelectedPaths({
          home: false,
          "what-we-offer": true,
          "about-us": false,
          "sign-in": false,
        });
        break;
      case "/about-us":
        setSelectedPaths({
          home: false,
          "what-we-offer": false,
          "about-us": true,
          "sign-in": false,
        });
        break;
      case "/sign-in":
        setSelectedPaths({
          home: false,
          "what-we-offer": false,
          "about-us": false,
          "sign-in": true,
        });
        break;
    }
  }, [pathname]);
  return { selectedPaths };
};
