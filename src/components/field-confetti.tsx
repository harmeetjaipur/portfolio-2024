import { useEffect, useState } from "react";
import { useDeck } from "./deck";
import { logSize } from "./experience";

const colors = ["#d6ff3e", "#6ae7ff", "#ff4f9a"];

const bits = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${6 + ((index * 19) % 78)}%`,
  delay: `${(index % 9) * 0.12}s`,
  duration: `${5.4 + (index % 5) * 0.45}s`,
  color: colors[index % colors.length],
  size: index % 4 === 0 ? 11 : 8,
}));

type FieldConfettiProps = {
  page?: boolean;
};

export const FieldConfetti: React.FC<FieldConfettiProps> = ({ page }) => (
  <div
    className={page ? "field-confetti field-confetti--page" : "field-confetti"}
    aria-hidden="true"
  >
    {bits.map((bit, index) => (
      <span
        key={index}
        className="field-confetti__bit"
        style={{
          left: bit.left,
          top: bit.top,
          width: bit.size,
          height: bit.size,
          background: bit.color,
          animationDelay: bit.delay,
          animationDuration: bit.duration,
        }}
      />
    ))}
  </div>
);

/** Plays once when every timeline role has been opened. */
export const LogConfetti: React.FC = () => {
  const { visited, clearLog } = useDeck();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visited.length < logSize) return;
    setShow(true);
    const timer = window.setTimeout(() => {
      setShow(false);
      clearLog();
    }, 8400);
    return () => window.clearTimeout(timer);
  }, [visited.length, clearLog]);

  if (!show) return null;
  return <FieldConfetti page />;
};
