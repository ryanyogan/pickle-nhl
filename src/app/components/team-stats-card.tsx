"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Image from "next/image";

export interface TeamStats {
  id: string;
  name: string;
  logo: string;
  record: {
    items: Array<{
      summary: string;
      stats: Array<{ name: string; value: number }>;
    }>;
  };
  stats: Array<{
    name: string;
    value: number;
    displayValue: string;
  }>;
}

export function TeamStatsCard({ team }: { team: TeamStats }) {
  const chartData = team.stats
    .filter((stat) =>
      ["gamesPlayed", "wins", "losses", "otLosses"].includes(stat.name),
    )
    .map((stat) => ({
      name:
        stat.name === "gamesPlayed"
          ? "Games"
          : stat.name.charAt(0).toUpperCase() + stat.name.slice(1),
      value: stat.value,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
          <p className="text-xl opacity-80">{team.record.items[0].summary}</p>
        </div>
        <Image
          src={team.logo}
          alt={`${team.name} logo`}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Stats</h2>
          <div className="space-y-2">
            {team.stats.slice(0, 5).map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center bg-blue-800 bg-opacity-50 p-3 rounded"
              >
                <span className="font-medium">{stat.name}</span>
                <span className="text-lg">{stat.displayValue}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Season Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e40af",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Detailed Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {team.stats.slice(5).map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-blue-800 bg-opacity-50 p-4 rounded text-center"
            >
              <div className="text-sm opacity-80 mb-1">{stat.name}</div>
              <div className="text-xl font-semibold">{stat.displayValue}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
