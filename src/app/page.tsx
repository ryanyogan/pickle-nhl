import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { getAllTeamIds, getTeamData } from "src/lib/espn";
import TeamSelect from "./[teamId]/select";
import ScoresPage from "./scores/page";
import DivisionPage from "./division/page";

export default async function HomePage() {
  return (
    <>
      <main className="md:hidden">
        <Schedule />
      </main>
      <main className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800">
        <Schedule />
        <ScoresPage />
        <DivisionPage />
      </main>
    </>
  );
}

async function Schedule() {
  const [team, allTeams] = await Promise.all([
    getTeamData("21"),
    getAllTeamIds(),
  ]);

  const { name, logo, color, record, standing, games } = team;


  return (
    <section className="w-full mx-auto p-6">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Logo"
          priority
          width={24}
          height={24}
          className={clsx("h-6 w-6", {
            "dark:invert": color === "000000",
          })}
        />
        <h1 className="font-semibold text-2xl ml-2">{name}</h1>
      </div>
      <h3 className="text-gray-700 dark:text-gray-300 mb-2">{`${record} • ${standing}`}</h3>

      <TeamSelect allTeams={allTeams} teamId={"21"} />

      <h2 className="font-semibold text-xl">Schedule</h2>
      <div>
        {games.map((game, index) => (
          <Row
            key={game.id}
            index={index}
            isLast={index === games.length - 1}
            {...game}
          />
        ))}
      </div>
    </section>
  );
}

function Row(props: {
  awayScore?: number;
  color: string;
  date: string;
  homeScore?: number;
  index: number;
  isLast: boolean;
  logo: string;
  name: string;
  rank: number;
  teamId: string;
  winner?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col min-[450px]:flex-row justify-between px-0 min-[450px]:px-4 py-2",
        { "border-b border-gray-200 dark:border-gray-800": !props.isLast }
      )}
    >
      <div className="flex items-center">
        <Image
          src={props.logo}
          alt={props.name}
          priority={props.index < 10}
          width={20}
          height={20}
          className={clsx("h-5 w-5", {
            "dark:invert": props.color === "000000",
          })}
        />
        <Link href={`/${props.teamId}`} className="font-semibold text-sm sm:text-base ml-4">
          {props.rank !== 99 ? (
            <span className="text-sm uppercase font-normal text-gray-500 mr-2">
              {props.rank}
            </span>
          ) : null}
          {props.name}
        </Link>
      </div>
      <div className="flex flex-row-reverse justify-end min-[450px]:flex-row">
        {props.homeScore ? (
          <p className="text-gray-700 dark:text-gray-300 tabular-nums">{`${props.homeScore}-${props.awayScore}`}</p>
        ) : null}
        {props.homeScore ? (
          props.winner ? (
            <p className="font-semibold text-green-700 dark:text-green-500 ml-0 min-[450px]:ml-2 w-5 mr-4 min-[450px]:mr-0 text-center">
              W
            </p>
          ) : (
            <p className="font-semibold text-red-700 dark:text-red-500 ml-0 min-[450px]:ml-2 w-5 mr-4 min-[450px]:mr-0 text-center">
              L
            </p>
          )
        ) : props.homeScore === 0 ? (
          <p className="font-semibold text-gray-500 ml-0 min-[450px]:ml-2 w-5 mr-4 min-[450px]:mr-0 text-center">
            —
          </p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{props.date}</p>
        )}
      </div>
    </div>
  );
}
