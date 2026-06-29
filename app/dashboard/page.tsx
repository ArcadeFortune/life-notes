import { getUser } from "@/utils/supabase/user";
import DashboardLocal from "./dashboardLocal";
import DashboardRemote from "./dashboardRemote";

export default async function DashboardPage({ name }: { name?: string; }) {
  try {
    const user = await getUser();
    if (!user) return <DashboardLocal name={name} is_default={!name} />;
    else return <DashboardRemote name={name} is_default={!name} />;
  } catch (e) {
    console.error(e);
    return <DashboardLocal name={name} is_default={!name} />;
  }
}
