// import { cookies } from "next/headers";
// import type { Database } from "@/types/database";
// import { getUser } from "@/utils/user";
// import { createClient } from "@/utils/supabase/server";
// import { createDashboardLocal, getDashboardLocal } from "./dashboardLocal";

// /**
//  * Looks for default dashboard in the db, locally, or creates one locally
//  * @params Dashboard ID, optional
//  * @returns user defined default dashboard or a newly created dashboard
//  */
// export async function getDashboard(dashboardID?: string) {
//   const user = await getUser();
//   if (!user) {
//     return dashboardID
//       ? getDashboardLocal(dashboardID)
//       : createDashboardLocal();
//   }

//   const cookieStore = await cookies();
//   const supabase = createClient(cookieStore);

//   const { data: dashboard, error: fetchError } = await supabase
//     .from("dashboards")
//     .select("*")
//     .eq("user_id", user.id)
//     .eq("is_default", true)
//     .maybeSingle();

//   if (fetchError) {
//     console.error("Error fetching default dashboard:", fetchError);
//   }

//   if (dashboard) {
//     return dashboard;
//   }

//   const { data: createdDashboard, error: insertError } = await supabase
//     .from("dashboards")
//     .insert({ ...DEFAULT_DASHBOARD, user_id: user.id })
//     .select()
//     .single();

//   if (insertError) {
//     console.error("Error creating default dashboard:", insertError);
//     return {};
//   }

//   return createdDashboard ?? {};
// }
