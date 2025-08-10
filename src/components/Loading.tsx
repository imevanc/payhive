import { Dots } from "@/icons";

export const metadata = {
  title: "Loading - Calculating...",
};

export default function Loading() {
  return (
    <main className="relative my-56 w-full">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Dots className="mx-auto opacity-30" />
      </div>
      <div className="text-center relative z-10 flex flex-col justify-center items-center space-y-10 px-8 md:px-2">
        <div className="relative">
          <div className="w-24 h-24 border-8 border-gray-200 border-t-lime-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-lime-600">£££</span>
          </div>
        </div>

        <h2 className="text-xl md:text-3xl font-semibold text-gray-700 pt-8 mb-6">
          Balancing the books...
        </h2>

        <div className="text-lg md:text-xl text-gray-600 flex flex-col items-center justify-center">
          <span>Our busy bees are crunching the numbers for you.</span>
          <span>This calculation won't take long!</span>
        </div>

        <p className="text-baseline md:text-lg text-gray-500 italic mb-8">
          Status: PROCESSING_LEDGER_001
        </p>

        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-lime-600 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-lime-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-lime-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </main>
  );
}
