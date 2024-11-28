import clsx from "clsx";
import { fetchArticles } from "../espn";

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <section className="w-full mx-auto p-6">
      <h2 className="font-semibold text-2xl">Latest Updates</h2>
      <div className="mt-4">
        {articles.map((article, index) => (
          <Row
            key={index}
            headline={article.headline}
            index={index}
            isLast={index === articles.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function Row({ index, isLast, headline, link }: any) {
  return (
    <div
      className={clsx(
        "flex flex-col min-[450px]:flex-row justify-between px-0 min-[450px]:px-4 py-2",
        { "border-b border-gray-200 dark:border-gray-800": !isLast }
      )}
    >
      <div className="flex text-base">{headline}</div>
    </div>
  );
}
