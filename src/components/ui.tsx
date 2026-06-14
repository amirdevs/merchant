import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Panel({
  children,
  className,
  title,
  bodyClassName,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("game-panel", className)}>
      {title ? (
        <div className="game-panel-header">
          <h2 className="game-panel-title">{title}</h2>
        </div>
      ) : null}
      <div className={cn("game-panel-body", bodyClassName)}>{children}</div>
    </section>
  );
}

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("game-button", className)} {...props} />;
}

export function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("game-icon-button", className)} {...props} />;
}

export function Muted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("game-muted", className)} {...props} />;
}
