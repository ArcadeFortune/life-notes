"use client";

import { createDashboardLocal, deleteDashboardLocal, getDashboardLocal, getDefaultDashboardLocal, saveDashboardLocal } from "@/app/dashboard/actions/dashboardLocal";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import Loading from "@/components/loading";
import { DashboardData, DashboardDataInsert } from "./dashboard.types";

/**
 * Loads dashboard using local data
 * @param param0 name of the dashboard to load
 * @returns loaded dashboard with local data
 */
export default function DashboardLocal({ name, is_default = false }: { name?: string, is_default?: boolean; }) {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  useEffect(() => {
    if (is_default) {
      getDefaultDashboardLocal().then(d => {
        if (d) setDashboard(d);
        else createDashboardLocal(undefined, true).then(setDashboard);
      });
    } else if (name) {
      createDashboardLocal().then(setDashboard);
      //getDashboardLocal(name).then(setDashboard);
    } else {
      createDashboardLocal().then(setDashboard);
    }
  }, []);

  return dashboard ? <Dashboard dashboard={dashboard} saveDashboard={saveDashboardLocal} deleteDashboard={deleteDashboardLocal}/> : <Loading />;
}
