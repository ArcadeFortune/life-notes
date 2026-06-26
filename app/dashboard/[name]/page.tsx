import { getUser } from "@/utils/supabase/user";
import DashboardLocal from "../dashboardLocal";
import DashboardRemote from "../dashboardRemote";

export default async function DashboardPage({ params }: { params: { name: string; }; }) {
  const { name } = await params;
  const user = await getUser();
  if (!user) return <DashboardLocal name={name} />;
  else return <DashboardRemote name={name} />;
}
