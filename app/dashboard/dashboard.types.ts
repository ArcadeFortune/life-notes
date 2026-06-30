import { WidgetAdd } from "./widgets/widgetAdd";
import { TimeWidget as WidgetTime } from "./widgets/widgetTime";

export type DashboardData = {
  id: string;
  name: string;
  widgets: WidgetData[];
};

export type DashboardDataInsert = {
  name: string;
  widgets: WidgetData[];
};

type BaseWidget = {
  index: number;
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

export type WidgetData = BaseWidget & (WidgetTime | WidgetAdd);
