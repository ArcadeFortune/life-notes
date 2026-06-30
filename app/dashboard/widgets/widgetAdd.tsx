import { SquarePlus } from "lucide-react";

export type WidgetAdd = {
  type: "add";
};

export default function WidgetAdd() {
  return (
    <div className="box group h-full flex items-center justify-center flex-col cursor-pointer">
      <SquarePlus className="w-1/2 h-1/2 group-hover:scale-120 transition-all group-active:scale-90" />
    </div>
  );
}
