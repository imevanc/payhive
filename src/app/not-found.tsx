import Link from "next/link";
import { Dots, Error404 } from "@/icons";

export const metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <main className="relative mb-10 w-full">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Dots className="mx-auto opacity-30" />
      </div>
      <div className="text-center relative z-10 flex flex-col justify-center items-center space-y-10 px-8 md:px-2">
        <Error404 />
        <h2 className="text-xl md:text-3xl font-semibold text-gray-700 pt-8 mb-6">
          Looks like these numbers don't balance!
        </h2>
        <div className="text-lg md:text-xl text-gray-600 flex flex-col items-center justify-center">
          <span>
            Our busy bees have audited this URL and found it doesn't compute.
          </span>
          <span>Perhaps it's been depreciated?</span>
        </div>
        <p className="text-baseline md:text-lg text-gray-500 italic mb-8">
          Error Code: MISSING_ASSET_404
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-lime-600 to-green-700 text-white font-semibold text-xl shadow-xl hover:from-lime-700 hover:to-green-800"
        >
          Return to Home Ledger
        </Link>
      </div>
    </main>
  );
}
