import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <h1>Welcome</h1>
      <Link href={"/dashboard"}>go to dashboard</Link>
    </>
  );
}
