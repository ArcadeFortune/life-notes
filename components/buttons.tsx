import { Pencil, Settings, X } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export function ButtonSettings({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn btn-primary group ${className ?? ""}`} {...props}>
      <Settings className="group-hover:rotate-30 group-active:rotate-90" />
    </button>
  );
}

export function ButtonWidgetSettings({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn p-0 group/button ${className ?? ""}`} {...props}>
      <Settings className="group-hover/button:rotate-30 group-active/button:rotate-90" />
    </button>
  );
}

export function ButtonEdit({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn btn-primary group/button ${className ?? ""}`} {...props}>
      <Pencil className="group-hover/button:rotate-[-10deg] group-active/button:rotate-0" />
    </button>
  );
}

export function ButtonClose({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`btn btn-primary group/button ${className ?? ""}`} {...props}>
      <X className="group-hover/button:scale-110 group-active/button:scale-100" />
    </button>
  );
}
