"use client";

import Widget from "./widget";
import { DashboardData } from "./dashboard.types";
import { ButtonClose, ButtonEdit } from "@/components/buttons";
import { useState } from "react";

interface DashboardProps {
  dashboard: DashboardData;
  saveDashboard: (d: DashboardData) => Promise<void>;
  deleteDashboard: (id: DashboardData["id"]) => Promise<void>;
}

export default function Dashboard({ dashboard, saveDashboard, deleteDashboard }: DashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dashboard.name);

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1>
          <form onSubmit={(e) => { e.preventDefault(); saveDashboard({ ...dashboard, name }); }}>
            <input disabled={!isEditing}
              onBlur={() => saveDashboard({ ...dashboard, name })}
              onChange={(e) => setName(e.target.value)}
              className={`cursor-text transition-all outline-0 w-full ${isEditing && "text-shadow-[0_0_2px_#005fff]"}`}
              value={name}
              name="title"
              type="text"
            /></form>
        </h1>
        {isEditing ?
          <ButtonClose onClick={() => setIsEditing(false)} /> :
          <ButtonEdit onClick={() => setIsEditing(true)} />
        }
      </div>
      <div>
        {dashboard.widgets.map((d, i) => (<Widget key={i} data={d} />))}
      </div>
    </div>
  );
}
