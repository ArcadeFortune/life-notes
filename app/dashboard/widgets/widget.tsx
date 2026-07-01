import { useSortable } from "@dnd-kit/react/sortable";
import { WidgetData } from "../dashboard.types";
import WidgetAdd from "./widgetAdd";
import WidgetTime from "./widgetTime";

export default function Widget({ data, editMode = false, saveWidget }: { data: WidgetData, editMode?: boolean, saveWidget: (w: WidgetData) => Promise<void>; }) {
  const { ref } = useSortable({ id: data.index, index: data.index, disabled: !editMode });
  if (!data.size) data.size = 2;

  return (
    <div ref={ref} className={`col-span-${data.size} box ${editMode && "box-highlight"} group`}>
      {(() => {
        switch (data.type) {
          case "time":
            return <WidgetTime data={data} saveWidget={saveWidget} />;
          case "add":
            return <WidgetAdd />;
          // default:
          //   return <p>Unknown type: {data.type}</p>;
        }
      })()}
    </div>
  );
}
