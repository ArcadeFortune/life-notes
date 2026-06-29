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
  data: DashboardData;
  saveDashboard: (d: DashboardData) => Promise<void>;
  deleteDashboard: (id: DashboardData["id"]) => Promise<void>;
}

export default function Dashboard({ data, saveDashboard, deleteDashboard }: DashboardProps) {
  const [dashboard, setDashboard] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <form onSubmit={(e) => { e.preventDefault(); toast.promise(saveDashboard({ ...dashboard }), saveDashboardMessages); }} className="w-full">
          <h1>
            <input disabled={!isEditing}
              onBlur={() => saveDashboard({ ...dashboard })} //notifying the user for every blur save is rather annoying
              onChange={(e) => setDashboard({ ...dashboard, name: e.target.value })}
              className={`cursor-text transition-all outline-0 w-full ${isEditing && "text-shadow-[0_0_2px_#005fff]"}`}
              value={dashboard.name}
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
