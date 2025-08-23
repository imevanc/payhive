"use client";

import {
  BanknotesIcon,
  ChartBarIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-8xl mx-auto">
          <div className="mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Your Business Dashboard
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome back,
              <span className="block text-green-700">Sarah</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Here is an overview of your business performance and recent
              activity
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-gray-50 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <ChartBarIcon className="w-24 h-24 text-green-600" />
                </div>
                <div className="px-10 py-5 pt-6">
                  <h3 className="text-sm/4 font-semibold text-green-600">
                    Monthly Overview
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Revenue & Expenses
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Track your monthly performance with detailed revenue and
                    expense analytics.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>

            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-gray-50 lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <CreditCardIcon className="w-24 h-24 text-blue-900" />
                </div>
                <div className="px-10 py-5 pt-6">
                  <h3 className="text-sm/4 font-semibold text-blue-900">
                    Recent Activity
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Latest Transactions
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    View and categorize your most recent business transactions
                    and payments.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 lg:rounded-tr-[2rem]" />
            </div>

            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-gray-50 lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <DocumentTextIcon className="w-20 h-20 text-green-700" />
                </div>
                <div className="px-10 py-5 pt-6">
                  <h3 className="text-sm/4 font-semibold text-green-600">
                    Invoices
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Pending & Paid
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Manage outstanding invoices and track payment status.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 lg:rounded-bl-[2rem]" />
            </div>

            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-gray-50" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <BanknotesIcon className="w-20 h-20 text-blue-600" />
                </div>
                <div className="px-10 py-5 pt-6">
                  <h3 className="text-sm/4 font-semibold text-blue-600">
                    Cash Flow
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Money in & out
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Monitor your business cash flow and forecast future trends.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5" />
            </div>

            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-gray-50 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <ClockIcon className="w-20 h-20 text-green-600" />
                </div>
                <div className="px-10 py-5 pt-6">
                  <h3 className="text-sm/4 font-semibold text-green-600">
                    Quick Actions
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Common tasks
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Access frequently used features and create new records
                    quickly.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Business Health
              </h3>
              <div className="text-sm text-gray-500">This Month</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">£12,450</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">£3,890</div>
                <div className="text-sm text-gray-600">Expenses</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">£8,560</div>
                <div className="text-sm text-gray-600">Net Profit</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">87</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
