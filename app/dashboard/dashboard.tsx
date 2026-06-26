import { Settings } from "lucide-react";
import Widget from "./widget";
import { DashboardData } from "./dashboard.types";
import { DropdownMenu } from "radix-ui";
import { setDefaultDashboardLocal } from "./actions/dashboardLocal";

export default function Dashboard({ data: dashboard }: { data: DashboardData; }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{dashboard.name}</h1>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="btn btn-primary group">
            <Settings className="group-hover:rotate-30 group-active:rotate-90 duration-(--transition-length)" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => setDefaultDashboardLocal(dashboard.id)}>
                Set as deafult
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <div className="container">
        {dashboard.widgets.map((d, i) => (<Widget key={i} data={d} />))}
      </div>
    </div>
  );
}
