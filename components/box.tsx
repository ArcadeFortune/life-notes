import { ComponentProps, ReactNode } from "react";

export default function Box({ isInteractive, children, className, ...props }: { isInteractive?: boolean, children?: ReactNode; } & ComponentProps<"div">) {
  return <div className={`p-2 border rounded transition-shadow shadow-[3px_3px_13px_-4px_#525252] ${isInteractive ? 'shadow-interactive' : ''} ${className ? className : ""}`} {...props}>
    {children}
  </div>;
}
