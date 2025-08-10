import { NavigationTab } from "@/types";

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    name: "Customers",
    items: [
      {
        name: "Customer List",
        href: "/customers",
        description: "View all customers",
      },
      {
        name: "Add Customer",
        href: "/customers/add",
        description: "Create new customer",
      },
      {
        name: "Customer Groups",
        href: "/customers/groups",
        description: "Manage customer segments",
      },
      {
        name: "Customer Reports",
        href: "/customers/reports",
        description: "Customer analytics",
      },
    ],
  },
  {
    name: "Banking",
    items: [
      {
        name: "Accounts",
        href: "/banking/accounts",
        description: "Bank account management",
      },
      {
        name: "Transactions",
        href: "/banking/transactions",
        description: "Transaction history",
      },
      {
        name: "Reconciliation",
        href: "/banking/reconciliation",
        description: "Bank reconciliation",
      },
      {
        name: "Transfers",
        href: "/banking/transfers",
        description: "Money transfers",
      },
    ],
  },
  {
    name: "Accounting",
    items: [
      {
        name: "Chart of Accounts",
        href: "/accounting/chart",
        description: "Account structure",
      },
      {
        name: "Journal Entries",
        href: "/accounting/journal",
        description: "Manual entries",
      },
      {
        name: "General Ledger",
        href: "/accounting/ledger",
        description: "Account balances",
      },
      {
        name: "Trial Balance",
        href: "/accounting/trial-balance",
        description: "Balance verification",
      },
    ],
  },
  {
    name: "Tools",
    items: [
      {
        name: "Bulk Operations",
        href: "/tools/bulk",
        description: "Batch processing",
      },
      {
        name: "Import/Export",
        href: "/tools/import-export",
        description: "Data management",
      },
      {
        name: "Integrations",
        href: "/tools/integrations",
        description: "Third-party apps",
      },
      {
        name: "Settings",
        href: "/tools/settings",
        description: "System configuration",
      },
    ],
  },
  {
    name: "Reports",
    items: [
      {
        name: "Financial Reports",
        href: "/reports/financial",
        description: "P&L, Balance Sheet",
      },
      {
        name: "Tax Reports",
        href: "/reports/tax",
        description: "Tax compliance",
      },
      {
        name: "Custom Reports",
        href: "/reports/custom",
        description: "Build your own",
      },
      {
        name: "Scheduled Reports",
        href: "/reports/scheduled",
        description: "Automated reporting",
      },
    ],
  },
];
