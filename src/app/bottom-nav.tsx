"use client";
import { CalendarIcon, RadioIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="max-w-screen-md mx-auto h-full flex items-center justify-around px-6">
      <Link
        href="/"
        className={`flex flex-col items-center space-y-1 ${
          pathname === "/" ? "dark:text-white text-black" : "text-gray-400"
        }`}
      >
        <CalendarIcon className="h-5 w-5" />
        <span className="text-xs">Schedule</span>
      </Link>
      <Link
        href="/scores"
        className={`flex flex-col items-center space-y-1 ${
          pathname === "/scores"
            ? "dark:text-white text-black"
            : "text-gray-400"
        }`}
      >
        <RadioIcon className="h-5 w-5" />
        <span className="text-xs">Scores</span>
      </Link>
      <Link
        href="/division"
        className={`flex flex-col items-center space-y-1 ${
          pathname === "/conference"
            ? "dark:text-white text-black"
            : "text-gray-400"
        }`}
      >
        <TrophyIcon className="h-5 w-5" />
        <span className="text-xs">Division</span>
      </Link>
    </div>
  );
}
