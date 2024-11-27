import Link from "next/link";
import { getTodaySchedule } from "./espn";
import clsx from "clsx";
import Image from "next/image";

export async function Scores() {
  const { games } = await getTodaySchedule();

  return (
    <div>
      {games.map((game: any, index: number) => {
        return (
          <div key={index} className={clsx("pb-2", {
            "border-b border-gray-200 dark:border-gray-800": index !== games.length - 1
          })}>
            <p className="flex justify-end mr-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              {game.status}
            </p>

            <Team index={index} status={game.status} {...game.homeTeam} />
            <Team index={index} status={game.status} {...game.awayTeam} />
          </div>
        )
      })}
    </div>
  )
}

function Team(
  props: {
    color: string;
    logo: string;
    name: string;
    rank: number;
    teamId: string;
    score: number;
    winner?: boolean;
    status: string;
    record: string;
    index: number;
  }
) {
  const faded = props.winner == false && props.status === "Final";

  return (
    <Link href={`/${props.teamId}`}>
      <div className="flex flex-row justify-between px-4 py-2 h-[60px]">
        <div className="flex">
          <Image
            src={props.logo}
            alt={props.name}
            priority={props.index < 10}
            width={20}
            height={20}
            className={clsx("size-6 mt-[2px]", { "dark:invert": props.color === "000000" })}
          />

          <div className="flex flex-col ml-4 leading-4 gap-y-1">
            <p className={clsx("font-semibold", { "text-gray-500": faded, "text-black dark:text-white": !faded })}>
              {props.rank !== 99 ? (
                <span className="text-sm uppercase font-normal text-gray-500 mr-2">
                  {props.rank}
                </span>
              ) : null}
              {props.name}
            </p>

            <p className={clsx("text-sm", { "text-gray-500": faded, "text-black dark:text-white": !faded })}>
              {props.record}
            </p>
          </div>
        </div>
        <div className={clsx("flex", {
          "text-gray-500": faded,
          "text-black dark:text-white": !faded
        })}>
          <p className="leading-normal font-semibold text-xl">{props.score}</p>
        </div>
      </div>
    </Link>
  )
}
