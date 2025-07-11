import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SelectedPath } from "@/types";

export const useSelectedPath = () => {
  const [selectedPath, setSelectedPath] = useState<SelectedPath>({
    home: false,
    services: false,
    "about-us": false,
    contact: false,
    "sign-in": false,
  });
  const pathname = usePathname();

  useEffect((): void => {
    switch (pathname) {
      case "/":
        setSelectedPath({
          home: true,
          services: false,
          "about-us": false,
          contact: false,
          "sign-in": false,
        });
        break;
      case "/services":
        setSelectedPath({
          home: false,
          services: true,
          "about-us": false,
          contact: false,
          "sign-in": false,
        });
        break;
      case "/about-us":
        setSelectedPath({
          home: false,
          services: false,
          "about-us": true,
          contact: false,
          "sign-in": false,
        });
        break;
      case "/contact":
        setSelectedPath({
          home: false,
          services: false,
          "about-us": false,
          contact: true,
          "sign-in": false,
        });
        break;
      case "/sign-in":
        setSelectedPath({
          home: false,
          services: false,
          "about-us": false,
          contact: false,
          "sign-in": true,
        });
        break;
      default:
        setSelectedPath({
          home: false,
          services: false,
          "about-us": false,
          contact: false,
          "sign-in": false,
        });
        break;
    }
  }, [pathname]);
  return { selectedPath };
};
