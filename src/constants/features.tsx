import {
  BookOpenIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const FEATURES = [
  {
    icon: <BookOpenIcon className="w-6 h-6 text-green-400" />,
    title: "Smart Bookkeeping",
    description:
      "Open banking integration for UK banks and digital banks with automated categorization",
  },
  {
    icon: <CreditCardIcon className="w-6 h-6 text-green-400" />,
    title: "Transaction Verification",
    description:
      "Modern drag & drop interface with tables and visual forms for easy verification",
  },
  {
    icon: <DocumentTextIcon className="w-6 h-6 text-green-400" />,
    title: "HMRC Tax Returns",
    description:
      "Generate compliant PDFs following HMRC submission flow requirements",
  },
];
