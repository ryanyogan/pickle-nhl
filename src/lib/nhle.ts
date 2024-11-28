import { unstable_cacheLife as cacheLife } from "next/cache";
import { getAllTeamIds } from "./espn";

export type TeamStandings = {
  position: number;
  division: string;
  wins: number;
  losses: number;
  ties: number;
  name: string;
  streakCode?: string;
  streakCount?: number;
  logo: string;
  winPercentage: number;
  points: number;
  teamId: string;
};

export async function fetchStandings(): Promise<TeamStandings[]> {
  "use cache";
  cacheLife("hours");

  const today = new Date().toISOString().split("T")[0] ?? "2024-11-28";

  const res = await fetch(`https://api-web.nhle.com/v1/standings/${today}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch team data: ${res.statusText}`);
  }

  const data = await res.json();
  const teamIds = await getAllTeamIds();

  return data.standings.map(
    (standings: any, index: number): TeamStandings => ({
      teamId: teamIds.find((team) => team.displayName === standings.teamName.default)?.id ?? "",
      position: index + 1,
      name: standings.teamName.default,
      wins: standings.wins,
      losses: standings.losses,
      ties: standings.ties,
      division: standings.divisionName,
      streakCode: standings.streakCode,
      streakCount: standings.streakCount,
      logo: standings.teamLogo,
      winPercentage: standings.winPctg,
      points: standings.points,
    })
  );
}