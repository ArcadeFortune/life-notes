"use client";

import { createDashboardLocal, getDashboardLocal, getDefaultDashboardLocal } from "@/app/dashboard/actions/dashboardLocal";
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
      createDashboardLocal().then(setDashboard);
      //getDefaultDashboardLocal().then(setDashboard);
    } else if (name) {
      createDashboardLocal().then(setDashboard);
      //getDashboardLocal(name).then(setDashboard);
    } else {
      createDashboardLocal().then(setDashboard);
    }
  }, []);

  return dashboard ? <Dashboard data={dashboard} /> : <Loading />;
}
