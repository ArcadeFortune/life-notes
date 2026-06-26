import { TimeWidget } from "./widgets/timeWidget";

export type DashboardData = {
  id: string | number;
  name: string;
  widgets: WidgetData[];
  is_default: boolean;
};

export type DashboardDataInsert = {
  name: string;
  widgets: WidgetData[];
  is_default: boolean;
}

export type WidgetData = TimeWidget;
