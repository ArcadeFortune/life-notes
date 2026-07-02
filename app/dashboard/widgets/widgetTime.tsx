"use client";

import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import WidgetEditForm from "./widgetEditForm";
import { BaseWidget, WidgetData } from "../dashboard.types";

export type WidgetTime = BaseWidget & {
  type: "time",
  name: string,
  timezone: string | undefined,
  hour12: boolean;
};

const browserSettings = new Intl.DateTimeFormat().resolvedOptions();
const all_timezones = Intl.supportedValuesOf("timeZone");
const countries: Record<string, Record<string, string[]>> = {};

all_timezones.forEach(t => {
  const [country, region, subregion] = t.split("/");
  if (!countries[country]) countries[country] = {};
  if (!countries[country][region]) countries[country][region] = [];
  if (subregion) countries[country][region].push(subregion);
});

export default function WidgetTime({ data, saveWidget }: { data: WidgetTime, saveWidget: (w: WidgetData) => Promise<void>; }) {
  const [form, setForm] = useState({
    name: data.name,
    timezone: data.timezone ?? browserSettings.timeZone,
    hour12: data.hour12 ?? browserSettings.hour12 ?? false,
  });
  const [time, setTime] = useState("");
  const timezoneSplit = form.timezone.split("/");
  const timezoneCountry = timezoneSplit[0];
  const timezoneRegion = timezoneSplit[1];
  const timezoneSubregion = timezoneSplit[2];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        setTime(now.toLocaleTimeString(undefined, {
          timeZone: form.timezone,
          hour12: form.hour12
        }));
      } catch (e) {
        console.error("invalid timezone detected:", form.timezone);
        setTime(now.toLocaleTimeString(undefined, {
          timeZone: undefined
        }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [form]);

  return (
    <div>
      <div className="flex items-center">
        <h2>{data.name}</h2>
        <WidgetEditForm name={data.name}
          onSubmit={() => saveWidget({ ...data, ...form })}
        >
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <label><input type="checkbox" checked={form.hour12} onChange={(e) => setForm({ ...form, hour12: e.target.checked })} />12 Hour Format</label>
          <select name="country"
            value={timezoneCountry}
            onChange={(e) => {
              const country = e.target.value;
              const defaultRegion = Object.keys(countries[country])[0];
              const defaultSubRegion = countries[defaultRegion]?.[0];
              setForm({
                ...form,
                timezone: `${country}/${defaultRegion}${defaultSubRegion ? `/${defaultSubRegion}` : ""}`,
              });
            }}
          >
            {Object.keys(countries).map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
          <select name="region"
            value={timezoneRegion}
            onChange={(e) => {
              const country = timezoneCountry;
              const region = e.target.value;
              const defaultSubRegion = countries[region]?.[0];
              setForm({
                ...form,
                timezone: `${country}/${region}${defaultSubRegion ? `/${defaultSubRegion}` : ""}`,
              });
            }}
          >
            {Object.keys(countries[timezoneCountry]).map((r, i) => (
              <option key={i}>{r}</option>
            ))}
          </select>
          {countries[timezoneCountry][timezoneRegion].length > 0 &&
            <select name="subregion"
              value={timezoneSubregion}
              onChange={(e) => {
                const country = timezoneCountry;
                const region = timezoneRegion;
                const defaultSubRegion = e.target.value;
                setForm({
                  ...form,
                  timezone: `${country}/${region}${defaultSubRegion ? `/${defaultSubRegion}` : ""}`,
                });
              }}
            >
              {countries[timezoneCountry][timezoneRegion].map((s, i) => (
                <option key={i}>{s}</option>
              ))}
            </select>
          }
        </WidgetEditForm>
      </div>
      {(!time) && <Loading />}
      <p className="text-2xl">{time}</p>
      <p>{data.timezone}</p>
    </div>
  );
}
