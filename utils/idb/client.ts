import { openDB } from "idb";

export function createClientIDB(name: string) {
  return openDB("Dashnotes", 1, {
    upgrade(db) {
      db.createObjectStore(name, {
        autoIncrement: true,
        keyPath: "id",
      });
    },
  });
}
