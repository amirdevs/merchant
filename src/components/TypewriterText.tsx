import { useEffect, useState } from "react";

export function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [visible, setVisible] = useState(text);

  useEffect(() => {
    setVisible("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 3;
      setVisible(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [text]);

  return <p className={className}>{visible}</p>;
}
