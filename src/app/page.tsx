import { getTeamData } from "./espn";

export default async function Home() {
  const team = await getTeamData("1");
  console.log(team);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
