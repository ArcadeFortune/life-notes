"use client";

import Widget from "./widget";
import { DashboardData } from "./dashboard.types";
import { ButtonClose, ButtonEdit } from "@/components/buttons";
import { useState } from "react";
import { toast, ToastPromiseParams } from "react-toastify";

const saveDashboardMessages: ToastPromiseParams = {
  error: "Unable to save dashboard, try again.",
  pending: "Saving dasbhaord",
  success: "Dashboard saved.",
};

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
        <form onSubmit={(e) => { e.preventDefault(); toast.promise(saveDashboard({ ...dashboard, name }), saveDashboardMessages); }}>
          <h1>
            <input disabled={!isEditing}
              onBlur={() => toast.promise(saveDashboard({ ...dashboard, name }), saveDashboardMessages)}
              onChange={(e) => setName(e.target.value)}
              className={`cursor-text transition-all outline-0 w-full ${isEditing && "text-shadow-[0_0_2px_#005fff]"}`}
              value={name}
              name="title"
              type="text"
            />
          </h1>
        </form>
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
