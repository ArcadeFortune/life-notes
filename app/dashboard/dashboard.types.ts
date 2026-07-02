import type { WidgetAdd } from "./widgets/widgetAdd";
import type { WidgetTime } from "./widgets/widgetTime";

export type DashboardData = {
  id: string;
  name: string;
  widgets: WidgetData[];
};

export type DashboardDataInsert = {
  name: string;
  widgets: WidgetData[];
};

export type BaseWidget = {
  index: number;
  size: 1 | 2 | 3 | 4 | 5 | 6;
};

export type WidgetData = WidgetTime | WidgetAdd;
