import { TimeWidget } from "./widgets/timeWidget";

export type DashboardData = {
  name: string;
  widgets: WidgetData[];
};

export type WidgetData = TimeWidget;
