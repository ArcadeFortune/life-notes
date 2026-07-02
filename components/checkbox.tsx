import { ReactNode } from "react";

export default function Checkbox({ children, name, value, setValue }: { children?: ReactNode, name: string, value: boolean, setValue: (v: boolean) => void; }) {
  return <label className="flex gap-2 items-center cursor-pointer group/checkbox select-none">
    <input hidden className="peer" type="checkbox" name={name} checked={value} onChange={(e) => setValue(e.target.checked)} />
    <div className="
    h-2.75 w-2.75 rounded-[3px] border group-hover/checkbox:shadow-interactive transition overflow-hidden
    after:block after:w-full after:h-full after:bg-foreground after:content-[''] after:scale-0 after:transition peer-checked:after:scale-100
    "></div>
    {children}
  </label>;
}
