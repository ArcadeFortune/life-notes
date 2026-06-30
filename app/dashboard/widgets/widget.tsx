import { useSortable } from "@dnd-kit/react/sortable";
import { WidgetData } from "../dashboard.types";
import WidgetAdd from "./widgetAdd";
import WidgetTime from "./widgetTime";

export default function Widget({ data }: { data: WidgetData; }) {
  const { ref } = useSortable({ id: data.index, index: data.index });
  if (!data.size) data.size = 2;

  return (
    <div ref={ref} className={`col-span-${data.size}`}>
      {(() => {
        switch (data.type) {
          case "time":
            return <WidgetTime data={data} />;
          case "add":
            return <WidgetAdd />;
          // default:
          //   return <p>Unknown type: {data.type}</p>;
        }
      })()}
    </div>
  );
}
