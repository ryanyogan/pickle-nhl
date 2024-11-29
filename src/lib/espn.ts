import { unstable_cacheLife as cacheLife } from "next/cache";

export type TeamBasicInfo = {
  id: string;
  displayName: string;
  logo?: string;
  color?: string;
};

type GameData = {
  id: string;
  date: string;
  name: string;
  teamId: string;
  rank: number;
  logo: string;
  color: string;
  homeScore?: number;
  awayScore?: number;
  winner?: boolean;
};

type TeamData = {
  id: string;
  name: string;
  logo: string;
  color: string;
  record: string;
  standing: string;
  games: GameData[];
};

type CompetitorData = {
  id: string;
  homeAway: string;
  team: TeamBasicInfo;
  score?: {
    value: number;
    displayValue: string;
  };
  winner?: boolean;
  records?: { summary: string }[];
  curatedRank?: { current: number };
};

const DEFAULT_LOGO =
  "https://a.espncdn.com/i/teamlogos/default-team-logo-500.png";

function getStat(stats: any[], name: string): string {
  return stats.find((stat: any) => stat.name === name)?.displayName ?? "";
}

export async function getTeamData(teamId: string): Promise<TeamData> {
  "use cache";
  cacheLife("hours");

  if (teamId.includes("teamId")) {
    return {
      id: teamId,
      name: "",
      logo: "",
      color: "",
      record: "",
      standing: "",
      games: [],
    };
  }

  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams/${teamId}/schedule`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch team data: ${res.statusText}`);
  }

  const data = await res.json();

  const games: GameData[] = data.events.map((event: any) => {
    const competitors = event.competitions[0].competitors;
    const favoriteTeam = competitors.find((team: any) => team.id === teamId);
    const otherTeam = competitors.find((team: any) => team.id !== teamId);

    if (!favoriteTeam || !otherTeam) {
      throw new Error(
        "Expected to find both the favorite team and the opposing team in the event comptitors"
      );
    }

    const color = otherTeam.team.color ?? "#000000";
    const logo = otherTeam.team.logos?.[0]?.href ?? DEFAULT_LOGO;

    return {
      id: event.competitions[0].id,
      date: event.competitions[0].status.type.shortDetail,
      name: otherTeam.team.displayName,
      teamId: otherTeam.team.id,
      rank: favoriteTeam.curatedRank?.current,
      logo,
      color,
      homeScore: favoriteTeam.score?.value,
      awayScore: otherTeam.score?.value,
      winner: favoriteTeam.winner,
    };
  });

  return {
    id: teamId,
    name: data.team.displayName,
    logo: data.team.logo,
    color: data.team.color,
    record: data.team.recordSummary,
    standing: data.team.standingSummary,
    games,
  };
}

type Article = {
  headline: string;
  published: string;
  link: string;
};

export async function fetchArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("days");

  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }

  const data = await res.json();

  return data.articles.slice(0, 20).map((article: any) => ({
    headline: article.headline,
    published: article.published,
    link: article.links.web.href,
  }));
}

export async function getTodaySchedule() {
  "use cache";
  cacheLife("seconds");

  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch today's schedule: ${res.statusText}`);
  }

  const data = await res.json();

  const games = data.events.map((event: any) => {
    const [homeTeam, awayTeam] = event.competitions[0].competitors;

    if (!homeTeam || !awayTeam) {
      throw new Error(
        "Expected to find both the home team and the away team in the event comptitors"
      );
    }

    return {
      status: event.competitions[0].status.type.shortDetail,
      homeTeam: formatTeamData(homeTeam),
      awayTeam: formatTeamData(awayTeam),
    };
  });

  return {
    date: data.date,
    games,
  };
}

function formatTeamData(teamData: CompetitorData) {
  return {
    name: teamData.team.displayName,
    teamId: teamData.team.id,
    rank: teamData.curatedRank?.current,
    logo: teamData.team.logo ?? DEFAULT_LOGO,
    color: teamData.team.color ?? "#000000",
    score: teamData.score,
    winner: teamData.winner,
    record: teamData.records
      ? `${teamData.records[0].summary}`
      : "N/A",
  };
}

export async function getAllTeamIds(): Promise<TeamBasicInfo[]> {
  "use cache";
  cacheLife("hours");

  const pagePromises = Array.from({ length: 8 }, (_, i) =>
    fetch(
      `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams?page=${i + 1
      }`
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch team IDs: ${res.statusText}`);
      }
      return res.json();
    })
  );

  const dataArray = await Promise.all(pagePromises);
  const teams: TeamBasicInfo[] = dataArray.flatMap((data) =>
    data.sports[0].leagues[0].teams.map((team: any) => team.team)
  );

  return teams.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export async function getAllTeams(): Promise<TeamBasicInfo[]> {
  "use cache";
  cacheLife("hours");

  const pagePromises = Array.from({ length: 8 }, (_, i) =>
    fetch(
      `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams?page=${i + 1
      }`
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch team data: ${res.statusText}`);
      }
      return res.json();
    })
  );

  const dataArray = await Promise.all(pagePromises);

  const teams: TeamBasicInfo[] = dataArray.flatMap((data) =>
    data.sports[0].leagues[0].teams.map((team: any) => team.team)
  );

  return teams.sort((a, b) => a.displayName.localeCompare(b.displayName));
}
