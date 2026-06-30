"use client";

import { createClientIDB } from "@/utils/idb/client";
import { DashboardData, DashboardDataInsert } from "../dashboard.types";

const LOCAL_USER_ID = "anonymous";
const DEFAULT_DASHBOARD: DashboardDataInsert = {
  name: "testaa",
  widgets: [
    {
      name: "timea",
      type: "time",
      timezone: "Europe/Zurich",
      index: 0,
      size: 2,
    },
  ],
};

/**
 * Checks the user preferences for their default dashboard
 * @returns DashboardData or null if there is no default dashboard set
 */
export async function getDefaultDashboardLocal() {
  const db = await createClientIDB();

  const userPreferences = await db.get("user_preferences", LOCAL_USER_ID);
  if (!userPreferences) return null;

  const dashboard = await db.get("dashboards", userPreferences.default_dashboard);
  if (!dashboard) {
    throw new Error("Dashboard does not exist anymore.");
  }

  return dashboard;
}

export async function setDefaultDashboardLocal(id: DashboardData["id"]) {
  throw new Error("Not implemeneted");
  const db = await createClientIDB();

  const dashboard = await db.get("dashboards", id)!;
  if (!dashboard) throw new Error("No Dashboard found.");

  // dashboard.is_default = true;

  //also remove is_default status of previous default dashboard
  // await db.put("dashboards", dashboard, id);
}

export async function getDashboardLocal(id: DashboardData["id"]) {
  if (!id) throw new Error("No ID was provided for the dashboard.");
  return DEFAULT_DASHBOARD;
}

export async function createDashboardLocal(name = `New Dashboard - ${new Date().toLocaleString()}`, makeDefault = false) {
  const widgets = DEFAULT_DASHBOARD.widgets;
  const dashboardId = crypto.randomUUID();
  const dashboard: DashboardData = { id: dashboardId, name, widgets };

  const db = await createClientIDB();
  await db.add("dashboards", dashboard, dashboardId);
  if (makeDefault) {
    await db.add("user_preferences", { default_dashboard: dashboardId }, LOCAL_USER_ID);
  }

  return dashboard;
}

export async function saveDashboardLocal(data: DashboardData) {
  const db = await createClientIDB();

  console.debug("Inserting data of dashboard #%s. data: %o", data.id, data);
  await db.put("dashboards", data, data.id);
}

export async function deleteDashboardLocal(id: DashboardData["id"]) {
  const db = await createClientIDB();

  const preferences = await db.get("user_preferences", LOCAL_USER_ID);
  if (preferences?.default_dashboard === id) throw new Error("Cannot delete the default dashboard.");

  console.debug("Deleting Dashboard #%s", id);
  await db.delete("dashboards", id);
}
