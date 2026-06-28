import { TimeWidget } from "./widgets/timeWidget";

export type DashboardData = {
  id: string;
  name: string;
  widgets: WidgetData[];
};

export type DashboardDataInsert = {
  name: string;
  widgets: WidgetData[];
}

export type WidgetData = TimeWidget;
