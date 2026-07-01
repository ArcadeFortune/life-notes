"use client";

import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import WidgetEditForm from "./widgetEditForm";
import { BaseWidget, WidgetData } from "../dashboard.types";

export type WidgetTime = BaseWidget & {
  type: "time",
  name: string,
  timezone: string | undefined,
};

export default function WidgetTime({ data, saveWidget }: { data: WidgetTime, saveWidget: (w: WidgetData) => Promise<void>; }) {
  const [form, setForm] = useState({ name: data.name, timezone: data.timezone });
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!form.timezone) {
      setForm({ ...form, timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone });
    }
  }, [form.timezone]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(undefined, {
        timeZone: form.timezone
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <h2>{data.name}</h2>
        <WidgetEditForm name={data.name} onSubmit={() => saveWidget({ ...data, ...form })}>
          <input type="text" value={form.name} onChange={(e) => {
            console.log(e.target.value);
            setForm({ ...form, name: e.target.value });
          }} />
        </WidgetEditForm>
      </div>
      {(!time) && <Loading />}
      <p className="text-2xl">{time}</p>
      <p>{form.timezone}</p>
    </div>
  );
}
