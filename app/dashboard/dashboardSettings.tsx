"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "./dashboard.types";

export default function DashboardSettings({ dashboard }: { dashboard: DashboardData; }) {
  const [title, setTitle] = useState(dashboard.name);

  return (
    <>
      <h3>Dashboard Settings</h3>
      <label>
        Title
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
    </>
  );
}
