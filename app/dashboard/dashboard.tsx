import { Settings } from "lucide-react";
import Widget from "./widget";
import { DashboardData } from "./dashboard.types";

export default function Dashboard({ data: dashboard }: { data: DashboardData; }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{dashboard.name}</h1>
        <button type="button" className="btn btn-primary group">
          <Settings className="group-hover:rotate-30 group-active:rotate-90 duration-(--transition-length)" />
        </button>
      </div>
      <div className="container">
        {dashboard.widgets.map((d, i) => (<Widget key={i} data={d} />))}
      </div>
    </div>
  );
}
