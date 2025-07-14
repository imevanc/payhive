"use client";
import { useState } from "react";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CreditCardIcon,
  DocumentTextIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { FAQS, FEATURES } from "@/constants";

export default function HomePage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (question: string) => {
    setOpenItems((prev: Record<string, boolean>) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };
  return (
    <main>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Built for UK Sole Traders
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Bookkeeping & Invoicing
              <span className="block text-green-700">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your business finances with automated bookkeeping, open
              banking integration, and professional invoicing. Everything you
              need to manage your sole trader business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                <span>Start Free Trial</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>

              <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                View Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                <span>HMRC compliant</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.title + idx}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Dashboard Preview
              </h3>
              <div className="text-sm text-gray-500">Live Demo</div>
            </div>

            <div className="space-y-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <BookOpenIcon className="w-5 h-5 text-green-700" />
                    <span className="font-medium text-green-900">
                      Automated Bookkeeping
                    </span>
                  </div>
                  <span className="text-sm text-green-700">Connected</span>
                </div>
                <div className="text-sm text-green-800">
                  Open banking synced • Transactions categorized • Ready for
                  review
                </div>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <CreditCardIcon className="w-5 h-5 text-blue-900" />
                    <span className="font-medium text-blue-900">
                      Transaction Verification
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-blue-700" />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <div className="h-6 bg-blue-200 rounded"></div>
                  <div className="h-6 bg-blue-300 rounded"></div>
                  <div className="h-6 bg-blue-200 rounded"></div>
                  <div className="h-6 bg-blue-400 rounded"></div>
                </div>
                <div className="text-sm text-blue-800">
                  Drag & drop interface • Visual verification • Bulk processing
                </div>
              </div>

              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="w-5 h-5 text-green-700" />
                    <span className="font-medium text-green-900">
                      Professional Invoicing
                    </span>
                  </div>
                  <span className="text-sm text-green-700">3 Templates</span>
                </div>
                <div className="text-sm text-green-800">
                  Auto-generation • Stripe/PayPal integration • PDF export
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">15min</div>
                <div className="text-sm text-gray-600">Setup time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">98%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">10+hrs</div>
                <div className="text-sm text-gray-600">Saved weekly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">100%</div>
                <div className="text-sm text-gray-600">HMRC compliant</div>
              </div>
            </div>
          </div>
          <div className="bg-white" data-testid="faqs">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-semibold tracking-tight text-gray-900 text-3xl md:text-4xl">
                  Frequently asked questions
                </h2>
                <dl className="mt-16 divide-y divide-gray-900/10">
                  {FAQS.map((faq) => (
                    <div
                      key={faq.question}
                      className="py-6 first:pt-0 last:pb-0"
                    >
                      <dt>
                        <button
                          className="group flex w-full items-start justify-between text-left text-gray-900"
                          onClick={() => toggleItem(faq.question)}
                        >
                          <span className="text-base md:text-lg lg:text-xl font-semibold">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {openItems[faq.question] ? (
                              <MinusIcon
                                aria-hidden="true"
                                className="size-6"
                              />
                            ) : (
                              <PlusIcon aria-hidden="true" className="size-6" />
                            )}
                          </span>
                        </button>
                      </dt>
                      {openItems[faq.question] && (
                        <dd className="mt-2 pr-12">
                          <p className="text-base/7 text-gray-600">
                            {faq.answer}
                          </p>
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
