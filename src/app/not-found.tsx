import type { NextPage } from "next/types";
import { Rufina } from "next/font/google";
import Link from "next/link";
import { Dots, Error404 } from "@/icons";

const rufina = Rufina({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "404 - Page Not Found",
};

const NotFound: NextPage = () => (
  <html className={rufina.className} lang="en">
    <body>
      <main>
        <div className="relative min-h-screen">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Dots />
          </div>
          <div className="text-center relative z-10 flex flex-col justify-center items-center space-y-10 px-8 md:px-2">
            <Error404 />
            <h2 className="text-xl md:text-3xl font-semibold text-gray-700 pt-8 mb-6">
              Looks like these numbers don't balance!
            </h2>
            <div className="text-lg md:text-xl text-gray-600 flex flex-col items-center justify-center">
              <span>
                Our busy bees have audited this URL and found it doesn't
                compute.
              </span>
              <span>Perhaps it's been depreciated?</span>
            </div>
            <p className="text-baseline md:text-lg text-gray-500 italic mb-8">
              Error Code: MISSING_ASSET_404
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xl shadow-xl hover:from-amber-600 hover:to-amber-700"
            >
              Return to Home Ledger
            </Link>
          </div>
        </div>
      </main>
    </body>
  </html>
);

export default NotFound;
