"use client";

import Loading from "@/components/loading";
import { useEffect, useState } from "react";

export type TimeWidget = {
  type: "time",
  name: string,
  timezone: string | undefined,
};

export default function TimeWidget({ data }: { data: TimeWidget; }) {
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState(data.timezone);

  useEffect(() => {
    if (!timezone) {
      setTimezone(new Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, [timezone]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(undefined, {
        timeZone: timezone
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>{data.name}</h2>
      {(!time || !timezone) && <Loading />}
      <p className="text-2xl">{time}</p>
      <p>{timezone}</p>
    </>
  );
}
