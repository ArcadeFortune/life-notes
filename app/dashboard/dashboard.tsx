import { Settings } from "lucide-react";
import Widget from "./widget";
import { DashboardData } from "./dashboard.types";
import { Dialog, DropdownMenu } from "radix-ui";
import { setDefaultDashboardLocal } from "./actions/dashboardLocal";

export default function Dashboard({ data: dashboard }: { data: DashboardData; }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{dashboard.name}</h1>
        <Dialog.Root>
          <Dialog.Trigger className="btn btn-primary group">
            <Settings className="group-hover:rotate-30 group-active:rotate-90 duration-(--la-transition-length)" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-(--la-overlay-background)" />
            <Dialog.Content>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description>
                Make changes to your profile here. Click save when you&apos;re done.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="btn btn-primary group">
            <Settings className="group-hover:rotate-30 group-active:rotate-90 duration-(--la-transition-length)" />
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
