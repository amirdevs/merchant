import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../../../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  subtle?: boolean;
};

export function Button({ className, children, subtle = false, ...props }: ButtonProps) {
  return (
    <button className={cn("ui-button", subtle && "ui-button-subtle", className)} {...props}>
      <span className="ui-button-inner">{children}</span>
    </button>
  );
}
