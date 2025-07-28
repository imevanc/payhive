import {
  BriefcaseIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: <BriefcaseIcon className="w-6 h-6 text-green-500" />,
      title: "Business Analytics",
      description:
        "Gain deeper insights into your business with performance reports, trend forecasting, and cash flow breakdowns.",
    },
    {
      icon: <ChartBarIcon className="w-6 h-6 text-green-500" />,
      title: "Real-time Metrics",
      description:
        "Monitor your KPIs live with tailored dashboards showing revenue, expenses, and growth targets.",
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-green-500" />,
      title: "Security & Compliance",
      description:
        "GDPR-compliant and HMRC-ready with encrypted access and secure audit trails.",
    },
    {
      icon: <PresentationChartLineIcon className="w-6 h-6 text-green-500" />,
      title: "Expert Support",
      description:
        "Connect with certified advisors for quarterly reviews, bookkeeping help, and tax planning advice.",
    },
  ];

  return (
    <main className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Professional Services
            <span className="block text-green-700">for Sole Traders</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Go beyond bookkeeping. Empower your business with actionable
            insights, secure tools, and expert advice - everything a sole trader
            needs to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, idx) => (
            <div
              key={service.title + idx}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/sign-up"
            className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </main>
  );
}
