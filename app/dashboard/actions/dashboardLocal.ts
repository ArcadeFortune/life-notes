"use client";

import { createClientIDB } from "@/utils/idb/client";
import { DashboardData, DashboardDataInsert } from "../dashboard.types";

const DEFAULT_DASHBOARD: DashboardDataInsert = {
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
export async function getDefaultDashboardLocal() {
  throw new Error("Not implemented")
  /*
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
  */
}

export async function setDefaultDashboardLocal(id: DashboardData["id"]) {
  const db = await createClientIDB("dashboards");

  const dashboard: DashboardData = await db.get("dashboards", id);
  if (!dashboard) throw new Error("No Dashboard found.");

  dashboard.is_default = true;

  await db.put("dashboards", dashboard, id);
}

export async function getDashboardLocal(id: DashboardData["id"]) {
  if (!id) throw new Error("No ID was provided for the dashboard.");
  return DEFAULT_DASHBOARD;
}

export async function createDashboardLocal(name?: DashboardData["name"]): Promise<DashboardData> {
  const widgets = name ? [] : DEFAULT_DASHBOARD.widgets;

  const db = await createClientIDB("dashboards");
  const dashboardInsert: DashboardDataInsert = {
    name: name ?? `New Dashboard - ${new Date().toLocaleString()}`,
    is_default: false,
    widgets: widgets,
  };

  const id = await db.add("dashboards", dashboardInsert);

  const dashboard: DashboardData = { ...dashboardInsert, id: Number(id) }
  return dashboard;
}
