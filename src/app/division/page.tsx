import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { fetchStandings } from "src/lib/nhle";

export default async function DivisionPage() {
  const standings = await fetchStandings();

  return (
    <section className="w-full mx-auto p-6">
      <h2 className="font-semibold text-2xl">Division Standings</h2>
      <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-2 flex justify-end pr-4">
        W - L
      </h3>
      <div>
        {standings.map((standing, index) => (
          <Row key={standing.name} index={index} isLast={index === standings.length - 1} {...standing} />
        ))}
      </div>
    </section>
  );
}

function Row({
  index,
  isLast,
  logo,
  name,
  wins,
  losses,
  division,
  teamId
}: any) {
  return (
    <div
      className={clsx(
        'flex flex-col min-[450px]:flex-row justify-between px-0 min-[450px]:px-4 py-2',
        { 'border-b border-gray-200 dark:border-gray-800': !isLast }
      )}
    >
      <div className="flex items-center">
        <Image
          src={logo}
          alt={name}
          priority={index < 10}
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <Link href={`/${teamId}`} className="font-semibold ml-4">
          {name}
        </Link>
        <div className="text-xs tracking-tighter font-thin text-gray-400 ml-2">
          {division}
        </div>
      </div>
      <div className="flex flex-row-reverse justify-end min-[450px]:flex-row">
        <p className="text-gray-700 dark:text-gray-300 tabular-nums">
          {`${wins}-${losses}`}
        </p>
      </div>
    </div>
  );
}
