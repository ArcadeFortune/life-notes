import DashboardPage from "../page";

export default async function DashboardPageName({ params }: { params: { name: string; }; }) {
  const { name } = await params;
  return <DashboardPage name={name} />;
}
