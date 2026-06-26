import { WidgetData } from "./dashboard.types";
import TimeWidget from "./widgets/timeWidget";

export default function Widget({ data }: { data: WidgetData; }) {
  return (
    <div className="flex items-center flex-col p-1 border rounded-(--border-radius) border-(--foreground-accent)">
      {(() => {
        switch (data.type) {
          case "time":
            return <TimeWidget data={data} />;
          default:
            return <p>Unknown type: {data.type}</p>;
        }
      })()}
    </div>
  );
}
