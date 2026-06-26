import { getUser } from "@/utils/supabase/user";
import DashboardLocal from "./dashboardLocal";
import DashboardRemote from "./dashboardRemote";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) return <DashboardLocal is_default={true} />;
  else return <DashboardRemote is_default={true} />;
}
