import { DashboardData } from "@/app/dashboard/dashboard.types";
import { DBSchema, openDB } from "idb";

interface DashnotesDB extends DBSchema {
  dashboards: {
    key: string,
    value: DashboardData,
  };
  user_preferences: {
    key: string, // should be only the local user id ("anonymous")
    value: { default_dashboard: DashboardData["id"]; },
  };
}


export function createClientIDB() {
  return openDB<DashnotesDB>("Dashnotes", 1, {
    upgrade(db) {
      const dashboards = db.createObjectStore("dashboards", {
      });

      db.createObjectStore("user_preferences", {
      });
    },
  });
}
