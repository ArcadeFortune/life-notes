import { useSortable } from "@dnd-kit/react/sortable";
import { WidgetData } from "../dashboard.types";
import WidgetAdd from "./widgetAdd";
import WidgetTime from "./widgetTime";
import Box from "@/components/box";

export default function Widget({ data, editMode = false, saveWidget }: { data: WidgetData, editMode?: boolean, saveWidget: (w: WidgetData) => Promise<void>; }) {
  const { ref } = useSortable({ id: data.index, index: data.index, disabled: !editMode });
  if (!data.size) data.size = 2;

  return (
    <Box ref={ref} isInteractive={editMode} className={`col-span-${data.size} ${editMode && "box-highlight"} group`}>
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
    </Box>
  );
}
