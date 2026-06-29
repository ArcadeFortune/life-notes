import { Pencil, Settings, X } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export function ButtonSettings({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn btn-primary group ${className ?? ""}`} {...props}>
      <Settings className="group-hover:rotate-30 group-active:rotate-90" />
    </button>
  );
}

export function ButtonEdit({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn btn-primary group ${className ?? ""}`} {...props}>
      <Pencil className="group-hover:rotate-[-10deg] group-active:rotate-0" />
    </button>
  );
}

export function ButtonClose({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn btn-primary group ${className ?? ""}`} {...props}>
      <X className="group-hover:scale-110 group-active:scale-100" />
    </button>
  );
}
