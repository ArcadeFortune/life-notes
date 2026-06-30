import { SquarePlus } from "lucide-react";

export type WidgetAdd = {
  type: "add";
};

export default function WidgetAdd() {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <SquarePlus className="w-1/2 h-1/2 group-hover:scale-120 transition-all group-active:scale-90" />
    </div>
  );
}
