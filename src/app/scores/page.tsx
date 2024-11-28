import clsx from "clsx";
import { Suspense } from "react";
import { Scores } from "./scores";

function TeamSkeleton() {
  return (
    <div className="flex flex-row justify-between py-2 h-[60px] motion-safe:animate-pulse">
      <div className="flex">
        <div className="h-6 w-6 mt-[2px] bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="flex flex-col ml-4 leading-4 gap-y-1">
          <p className="bg-gray-300 dark:bg-gray-700 h-4 w-40 rounded" />
          <p className="bg-gray-200 dark:bg-gray-800 h-4 w-10 rounded" />
        </div>
      </div>
      <p className="flex text-gray-600 dark:text-gray-400 leading-normal font-semibold text-xl">
        {"-"}
      </p>
    </div>
  );
}

function ScoresLoading() {
  const rows = Array.from({ length: 10 });

  return (
    <div>
      {rows.map((_, index) => {
        return (
          <div
            key={index}
            className={clsx("pb-2", {
              "border-b border-gray-200 dark:border-gray-800":
                index !== rows.length - 1,
            })}
          >
            <div className="h-5 mt-4" />
            <TeamSkeleton />
            <TeamSkeleton />
          </div>
        );
      })}
    </div>
  );
}

export default function ScoresPage() {
  return (
    <section className="w-full mx-auto p-6">
      <h2 className="font-semibold text-2xl">Scores</h2>
      <Suspense fallback={<ScoresLoading />}>
        <Scores />
      </Suspense>
    </section>
  );
}
