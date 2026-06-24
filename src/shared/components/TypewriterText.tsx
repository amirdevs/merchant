import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type TypewriterTextProps = HTMLAttributes<HTMLParagraphElement> & {
  text: string;
};

export function TypewriterText({ className, text, ...props }: TypewriterTextProps) {
  return (
    <p className={cn("whitespace-pre-line", className)} {...props}>
      {text}
    </p>
  );
}
