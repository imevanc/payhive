"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { toKebabCase } from "@/utils";
import { useSelectedPath } from "@/hooks";

export const Header: FC<{
  tabs: Array<{ name: string; href: string }>;
  dataTestId: string;
}> = ({ tabs, dataTestId }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { selectedPath } = useSelectedPath();
  const [mobileLinkHoveredTab, setMobileLinkHoveredTab] = useState<
    string | null
  >(null);

  const selectedPathClassName = `text-green-700 border-b-2 border-green-700 font-semibold`;
  const nonSelectedPathClassName =
    "text-gray-600 hover:text-green-700 hover:border-b-2 hover:border-green-300 font-semibold transition-colors";
  const selectedPathMobileClassName = "bg-green-100 text-green-900";
  const nonSelectedPathMobileClassName =
    "text-gray-900 hover:bg-green-50 hover:text-green-700 transition-colors";

  const getMobileTabStyle = (tab: Record<string, string>) => ({
    backgroundColor: selectedPath[
      toKebabCase(tab.name) as keyof typeof selectedPath
    ]
      ? "#dcfce7"
      : mobileLinkHoveredTab === tab.name
        ? "#f0fdf4"
        : "transparent",
    color: selectedPath[toKebabCase(tab.name) as keyof typeof selectedPath]
      ? "#14532d"
      : mobileLinkHoveredTab === tab.name
        ? "#15803d"
        : "#111827",
  });

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      data-testid={`header-${dataTestId}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="px-6 pt-4 pb-4 lg:max-w-none lg:px-8">
          <nav
            aria-label="Global"
            className="flex items-center justify-between"
          >
            <Link href="/" className="-m-1.5 p-2">
              <span className="sr-only">PayHive</span>
              <span className="text-2xl font-bold text-gray-900">PayHive</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`text-lg text-nowrap py-2 px-1 border-b-2 border-transparent
                    ${selectedPath[toKebabCase(tab.name) as keyof typeof selectedPath] ? selectedPathClassName : nonSelectedPathClassName}
                  `}
                  style={{
                    borderColor: selectedPath[
                      toKebabCase(tab.name) as keyof typeof selectedPath
                    ]
                      ? "#15803d"
                      : "transparent",
                  }}
                >
                  {tab.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  href="/sign-in"
                  className={`text-lg text-nowrap py-2 px-1 border-b-2 border-transparent
                    ${selectedPath[toKebabCase("sign-in") as keyof typeof selectedPath] ? selectedPathClassName : nonSelectedPathClassName}
                  `}
                  style={{
                    borderColor: selectedPath[
                      toKebabCase("sign-in") as keyof typeof selectedPath
                    ]
                      ? "#15803d"
                      : "transparent",
                  }}
                >
                  Sign In
                </Link>

                <button
                  href="/sign-up"
                  className="cursor-pointer bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-200 shadow-xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 py-1.5 pr-1.5">
              <span className="sr-only">PayHive</span>
              <span className="text-2xl font-bold text-gray-900">PayHive</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setMobileMenuOpen(false)}
                    onMouseEnter={() => setMobileLinkHoveredTab(tab.name)}
                    onMouseLeave={() => setMobileLinkHoveredTab(null)}
                    className={`-mx-3 block rounded-lg px-3 py-3 text-lg font-semibold
                      ${
                        selectedPath[tab.name as keyof typeof selectedPath]
                          ? selectedPathMobileClassName
                          : nonSelectedPathMobileClassName
                      }
                    `}
                    style={getMobileTabStyle(tab)}
                  >
                    {tab.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-2">
                <Link
                  href="/sign-in"
                  onMouseEnter={() => setMobileLinkHoveredTab("sign-in")}
                  onMouseLeave={() => setMobileLinkHoveredTab(null)}
                  className={`-mx-3 block rounded-lg px-3 py-3 text-lg font-semibold
                      ${
                        selectedPath["sign-in" as keyof typeof selectedPath]
                          ? selectedPathMobileClassName
                          : nonSelectedPathMobileClassName
                      }
                    `}
                  style={getMobileTabStyle({ name: toKebabCase("sign-in") })}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/trial"
                  className="-mx-3 block rounded-lg px-3 py-3 text-lg font-semibold bg-green-700 text-white hover:bg-green-800 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
