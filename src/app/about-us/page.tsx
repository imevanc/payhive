"use client";
import {
  UsersIcon,
  BuildingOfficeIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AboutUsPage() {
  const highlights = [
    {
      icon: <UsersIcon className="w-6 h-6 text-green-600" />,
      title: "Community-Driven",
      description:
        "We're passionate about empowering UK sole traders with digital tools that make everyday business easier.",
    },
    {
      icon: <BuildingOfficeIcon className="w-6 h-6 text-green-600" />,
      title: "Built in the UK",
      description:
        "Headquartered in the heart of Manchester, our mission is to simplify compliance, finances, and growth for every solo entrepreneur.",
    },
    {
      icon: <LightBulbIcon className="w-6 h-6 text-green-600" />,
      title: "Always Innovating",
      description:
        "From open banking to AI-assisted categorisation, we're constantly evolving to deliver smarter services.",
    },
  ];

  return (
    <main className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Who We Are
            <span className="block text-green-700">And Why We Care</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            PayHive was founded to help UK sole traders navigate the financial
            maze with simplicity, compliance, and confidence. We believe your
            time should be spent building your business—not buried in paperwork.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={item.title + idx}
              className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
