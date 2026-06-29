import { useSortable } from "@dnd-kit/react/sortable";
import { WidgetData } from "../dashboard.types";
import WidgetAdd from "./widgetAdd";
import WidgetTime from "./widgetTime";

export default function Widget({ data, index }: { data: WidgetData | { type: "add"; }, index: number; }) {
  const { ref } = useSortable({ id: index, index });

  return (
    <div ref={ref} className={`col-span-2 flex items-center flex-col p-1 box ${data.type === "add" && "aspect-square"}`}>
      {(() => {
        switch (data.type) {
          case "time":
            return <WidgetTime data={data} />;
          case "add":
            return <WidgetAdd />;
          default:
            return <p>Unknown type: {data.type}</p>;
        }
      })()}
    </div>
  );
}
