import { TimeWidget } from "./widgets/timeWidget";

export type DashboardData = {
  name: string;
  widgets: WidgetData[];
  is_default: boolean;
};

export type WidgetData = TimeWidget;
