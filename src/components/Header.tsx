"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Logo } from "@/icons";
import { useSelectedPaths } from "@/hooks";
import { toLowerCase } from "@/utils";
import Link from "next/link";

const navigation: Array<Record<"name" | "href", string>> = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Company", href: "/company" },
  { name: "Log in", href: "/login" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { selectedPaths } = useSelectedPaths();
  const selectedPath = "underlined text-gray-900 border-b-2 border-orange-600";
  const nonSelectedPath =
    "hover:border-b-2 hover:border-orange-300 hover:text-gray-800";
  const selectedPathMobile = "bg-orange-300";
  const nonSelectedPathMobile = "hover:bg-orange-100";
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
          <nav
            aria-label="Global"
            className="flex items-center justify-between lg:justify-start"
          >
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">PayHive</span>
              <Logo className="h-20 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-xl font-semibold text-gray-600 
                    ${selectedPaths[toLowerCase(item.name.toString()) as keyof typeof selectedPaths] ? selectedPath : nonSelectedPath}
                  `}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 py-1.5 pr-1.5">
              <span className="sr-only">PayHive</span>
              <Logo className="h-20 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-gray-900 
                      ${selectedPaths[toLowerCase(item.name.toString()) as keyof typeof selectedPaths] ? selectedPathMobile : nonSelectedPathMobile}
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
