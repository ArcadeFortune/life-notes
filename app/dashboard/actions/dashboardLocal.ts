"use client";

import { createClientIDB } from "@/utils/idb/client";
import { DashboardData } from "../dashboard.types";

const DEFAULT_DASHBOARD: DashboardData = {
  name: "testaa",
  is_default: false,
  widgets: [
    {
      name: "timea",
      type: "time",
      timezone: "Europe/Zurich",
    },
  ],
};
export async function getDefaultDashboardLocal(): Promise<DashboardData> {
  return {
    name: "default dashboard",
    is_default: true,
    widgets: [
      {
        name: "timea",
        type: "time",
        timezone: "Europe/Zurich",
      },
    ],
  };
}

export async function getDashboardLocal(id: string) {
  if (!id) throw new Error("No ID was provided for the dashboard.");
  return DEFAULT_DASHBOARD;
}

export async function createDashboardLocal(name?: string): Promise<DashboardData> {
  const widgets = name ? [] : DEFAULT_DASHBOARD.widgets;

  const db = await createClientIDB("dashboards");
  const dashboard: DashboardData = {
    name: name ?? `New Dashboard - ${new Date().toLocaleString()}`,
    is_default: false,
    widgets: widgets,
  };

  await db.add("dashboards", dashboard);

  return dashboard;
}
