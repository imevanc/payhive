import type { NextPage } from "next/types";
import Link from "next/link";

const Home: NextPage = () => (
  <main>
    <div className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 lg:w-full lg:max-w-2xl">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-gray-50 lg:block"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
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
                Effortless Accounting, Bookkeeping, and Invoicing
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Focus on what you do best — we’ll handle the numbers. From
                tracking expenses to managing invoices, PayHive keeps your
                business buzzing smoothly.
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
      </div>
      <div className="bg-transparent lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          alt="working-bees"
          src="/hero.jpg"
          className="aspect-[3/2] object-contain lg:aspect-auto lg:size-full"
        />
      </div>
    </div>
  </main>
);
export default Home;
