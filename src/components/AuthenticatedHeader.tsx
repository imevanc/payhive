"use client";
import {FC, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Dialog, DialogPanel} from "@headlessui/react";
import {Bars3Icon, ChevronDownIcon, XMarkIcon} from "@heroicons/react/24/outline";

interface DropdownItem {
    name: string;
    href: string;
    description?: string;
}

interface NavigationTab {
    name: string;
    items: DropdownItem[];
}

export const AuthenticatedHeader: FC<{
    dataTestId: string;
}> = ({ dataTestId }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileModalOpen, setMobileModalOpen] = useState<boolean>(false);
    const [mobileModalContent, setMobileModalContent] = useState<NavigationTab | null>(null);
    const { data: session } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Navigation structure
    const navigationTabs: NavigationTab[] = [
        {
            name: "Customers",
            items: [
                { name: "Customer List", href: "/customers", description: "View all customers" },
                { name: "Add Customer", href: "/customers/add", description: "Create new customer" },
                { name: "Customer Groups", href: "/customers/groups", description: "Manage customer segments" },
                { name: "Customer Reports", href: "/customers/reports", description: "Customer analytics" },
            ],
        },
        {
            name: "Banking",
            items: [
                { name: "Accounts", href: "/banking/accounts", description: "Bank account management" },
                { name: "Transactions", href: "/banking/transactions", description: "Transaction history" },
                { name: "Reconciliation", href: "/banking/reconciliation", description: "Bank reconciliation" },
                { name: "Transfers", href: "/banking/transfers", description: "Money transfers" },
            ],
        },
        {
            name: "Accounting",
            items: [
                { name: "Chart of Accounts", href: "/accounting/chart", description: "Account structure" },
                { name: "Journal Entries", href: "/accounting/journal", description: "Manual entries" },
                { name: "General Ledger", href: "/accounting/ledger", description: "Account balances" },
                { name: "Trial Balance", href: "/accounting/trial-balance", description: "Balance verification" },
            ],
        },
        {
            name: "Tools",
            items: [
                { name: "Bulk Operations", href: "/tools/bulk", description: "Batch processing" },
                { name: "Import/Export", href: "/tools/import-export", description: "Data management" },
                { name: "Integrations", href: "/tools/integrations", description: "Third-party apps" },
                { name: "Settings", href: "/tools/settings", description: "System configuration" },
            ],
        },
        {
            name: "Reports",
            items: [
                { name: "Financial Reports", href: "/reports/financial", description: "P&L, Balance Sheet" },
                { name: "Tax Reports", href: "/reports/tax", description: "Tax compliance" },
                { name: "Custom Reports", href: "/reports/custom", description: "Build your own" },
                { name: "Scheduled Reports", href: "/reports/scheduled", description: "Automated reporting" },
            ],
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMobileTabClick = (tab: NavigationTab) => {
        setMobileMenuOpen(false);
        setMobileModalContent(tab);
        setMobileModalOpen(true);
    };

    const handleMobileModalClose = () => {
        setMobileModalOpen(false);
        setMobileModalContent(null);
        setMobileMenuOpen(true);
    };

    return (
        <>
            <header
                className="sticky inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
                data-testid={`header-${dataTestId}`}
            >
                <div className="mx-auto max-w-10xl">
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

                            <div className="hidden lg:flex lg:gap-x-1 lg:items-center" ref={dropdownRef}>
                                {navigationTabs.map((tab) => (
                                    <div key={tab.name} className="relative font-semibold">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === tab.name ? null : tab.name)}
                                            className="flex items-center font-semibold gap-1 text-lg text-gray-700 hover:text-green-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            {tab.name}
                                            <ChevronDownIcon
                                                className={`size-4 transition-transform ${
                                                    activeDropdown === tab.name ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>

                                        {activeDropdown === tab.name && (
                                            <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                                {tab.items.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="font-medium text-gray-900">{item.name}</div>
                                                        {item.description && (
                                                            <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button
                                    onClick={async () =>
                                        await signOut({
                                            redirect: true,
                                            callbackUrl: "/",
                                        })
                                    }
                                    className="ml-4 font-semibold text-lg text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
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
                                {navigationTabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => handleMobileTabClick(tab)}
                                        className="flex items-center justify-between w-full -mx-3 rounded-lg px-3 py-3 text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    >
                                        {tab.name}
                                        <ChevronDownIcon className="size-5 -rotate-90" />
                                    </button>
                                ))}
                            </div>

                            <div className="py-6">
                                <button
                                    onClick={async () => {
                                        setMobileMenuOpen(false);
                                        await signOut({
                                            redirect: true,
                                            callbackUrl: "/",
                                        });
                                    }}
                                    className="-mx-3 block rounded-lg px-3 py-3 text-lg font-semibold hover:text-green-600 text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

            {/* Mobile Modal for Dropdown Content */}
            <Dialog
                open={mobileModalOpen}
                onClose={handleMobileModalClose}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
                <DialogPanel className="fixed inset-0 z-50 overflow-y-auto bg-white">
                    <div className="min-h-full px-6 py-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-green-700 ">
                                {mobileModalContent?.name}
                            </h2>
                            <button
                                type="button"
                                onClick={handleMobileModalClose}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                <span className="sr-only">Back to menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        <div className="space-y-1">
                            {mobileModalContent?.items.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => {
                                        setMobileModalOpen(false);
                                        setMobileModalContent(null);
                                    }}
                                    className="group block rounded-lg px-4 py-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900 group-hover:text-green-600 text-lg">{item.name}</div>
                                    {item.description && (
                                        <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
};