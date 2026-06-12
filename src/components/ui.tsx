import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Panel({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
}) {
  return (
    <section className={cn("border-2 border-brass-soft bg-panel/90 p-3 shadow-2xl", className)}>
      {title ? <h2 className="mb-2 font-display text-lg">{title}</h2> : null}
      {children}
    </section>
  );
}

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 border border-brass bg-ember px-3 py-2 text-sm font-semibold text-parchment hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      {...props}
    />
  );
}

export function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "grid h-10 w-10 place-items-center border border-brass bg-ember text-parchment hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-parchment-muted", className)} {...props} />;
}
