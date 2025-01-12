import type { NextPage } from "next/types";
import Link from "next/link";

const Home: NextPage = () => (
  <main className="mt-24 mb-10 md:mb-0 flex flex-col space-y-4 md:space-y-0 md:flex-row md:flex-nowrap justify-center md:justify-end items-center max-w-7xl mx-auto">
    <div className="z-10 lg:w-full lg:max-w-2xl">
      <div className="px-6 py-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <div className="hidden sm:mb-10 sm:flex">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Trusted by 500+ businesses to keep their finances in check.{" "}
              <Link
                href="#"
                className="whitespace-nowrap font-semibold text-amber-600"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Effortless Accounting, Bookkeeping & Invoicing
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Focus on what you do best — we’ll handle the numbers. From tracking
            expenses to managing invoices, PayHive keeps your business buzzing
            smoothly.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="#"
              className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Get Started Today
            </Link>
            <Link
              href="#"
              className="text-sm/6 font-semibold text-gray-900 rounded-md px-3 py-1.5 hover:outline hover:outline-2 hover:outline-amber-500"
            >
              Learn More About PayHive<span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-transparent lg:w-full">
      <img
        alt="hero"
        src="/hero.jpg"
        className="aspect-[3/2] object-contain lg:aspect-auto lg:object-cover lg:size-full [clip-path:polygon(23%_0%,100%_0%,77%_100%,0%_100%)]"
      />
    </div>
  </main>
);
export default Home;
