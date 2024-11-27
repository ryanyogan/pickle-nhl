import Image from "next/image";
import { getTeamData } from "./espn";
import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage() {
  const team = await getTeamData("21");

  const { name, logo, color, record, standing, games } = team;

  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3">
      <section className="w-full mx-auto p-6 border-r border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="team logo"
            priority
            height={24}
            width={24}
            className={clsx("size-6", {
              "dark:invert": color === "000000"
            })}
          />
          <h1 className="font-semibold text-2xl ml-2">{name}</h1>
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 mb-2">{`${record} • ${standing}`}</h3>

        <h2 className="font-semibold text-xl">Schedule</h2>

        <div>
          {games.map((game, index) => {
            return (
              <Row key={game.id} {...game} index={index} isLast={index === games.length - 1} />
            )
          })}
        </div>
      </section>

      <section className="w-full mx-auto p-6 border-r border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-2xl">Scores</h2>
        <Suspense fallback={null}>
          hello
        </Suspense>
      </section>

      <section className="w-full mx-auto p-6 border-r border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-2xl">Division</h2>
      </section>
    </main>
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
    <div className={clsx(
      "flex flex-col min-[450px]:flex-row justify-between px-0 min-[450px]:px-4 py-2",
      { "border-b border-gray-200 dark:border-gray-800": !props.isLast }
    )}>
      <div className="flex">
        <Image
          src={props.logo}
          alt={props.name}
          priority={props.index < 10}
          width={20}
          height={20}
          className={clsx("size-5", { "dark:invert": props.color === "000000" })}
        />

        <Link href={`/${props.teamId}`} className="font-semibold ml-2">
          {props.rank !== 99 ? (
            <span className="text-sm uppercase font-normal text-gray-500 mr-2">{props.rank}</span>
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
            -
          </p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{props.date}</p>
        )}
      </div>
    </div>
  )
}
