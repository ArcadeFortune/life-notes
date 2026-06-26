"use client";

console.log("am i running?");

import { createClientIDB } from "@/utils/idb/client";
import { DashboardData } from "../dashboard.types";

const DEFAULT_DASHBOARD: DashboardData = {
  name: "testaa",
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

export async function createDashboardLocal(name?: string) {
  const widgets = name ? [] : DEFAULT_DASHBOARD.widgets;

  const db = await createClientIDB("dashboards");
  // const res = await db.add(
  //   "dashboards",
  //   {
  //     name: name ?? `New Dashboard - ${new Date().toLocaleString()}`,
  //     widgets: widgets,
  //   } satisfies DashboardData,
  // );
  const res = await db.get("dashboards", "test");
  console.log("res --->", res);

  return DEFAULT_DASHBOARD;
}
