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
  return openDB<DashnotesDB>("Dashnotes", 1.1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion < 1) {
        db.createObjectStore("dashboards");
        db.createObjectStore("user_preferences");
      }

      if (oldVersion < 1.1) {
        const store = transaction.objectStore("dashboards");
        return (async () => {
          let cursor = await store.openCursor();
          while (cursor) {
            const dashboard = cursor.value;

            await cursor.update({
              ...dashboard,
              widgets: dashboard.widgets.map((w, i) => ({
                ...w,
                index: i,
                size: 2,
              }))
            });
            cursor = await cursor.continue();
          }
        })();
      }
    },
  });
}
