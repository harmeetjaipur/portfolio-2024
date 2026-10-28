import { PointerEvent, useEffect, useRef, useState } from "react";
import { FieldConfetti } from "./field-confetti";
import { runStops } from "./experience";

type Stop = {
  year: string;
  place: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  caught: boolean;
};

type SignalRunProps = {
  onClose: () => void;
};

const steerKeys = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "a",
  "d",
  "w",
  "s",
]);

/**
 * Hidden run over the particle field. Collect each role year, then leave.
 */
const SignalRun: React.FC<SignalRunProps> = ({ onClose }) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const leaveRef = useRef<HTMLButtonElement>(null);
  const ship = useRef({ x: 80, y: 80 });
  const stops = useRef<Stop[]>([]);
  const keys = useRef(new Set<string>());
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const [caught, setCaught] = useState(0);
  const [complete, setComplete] = useState(false);
  const finished = useRef(false);
  const [latest, setLatest] = useState("Arrows or drag. Collect the years.");

  useEffect(() => {
    leaveRef.current?.focus();
    document.body.classList.add("run-open");

    const frameId = { id: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const field = fieldRef.current;
    const rect = field?.getBoundingClientRect();
    const width = rect?.width ?? window.innerWidth;
    const height = rect?.height ?? window.innerHeight;

    ship.current = { x: width / 2, y: height / 2 };
    stops.current = runStops.map((stop, index) => {
      const angle = (index / runStops.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.32;
      return {
        ...stop,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius * 0.7,
        vx: (index % 2 === 0 ? 18 : -18),
        vy: (index % 3 === 0 ? 14 : -14),
        caught: false,
      };
    });

    const place = (element: HTMLElement | null, x: number, y: number) => {
      if (!element) return;
      element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    place(shipRef.current, ship.current.x, ship.current.y);
    stops.current.forEach((stop, index) => {
      place(stopRefs.current[index], stop.x, stop.y);
    });

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 1000;
      last = now;
      const bounds = fieldRef.current?.getBoundingClientRect();
      const viewWidth = bounds?.width ?? width;
      const viewHeight = bounds?.height ?? height;
      let { x, y } = ship.current;
      const speed = 340;

      if (keys.current.has("ArrowLeft") || keys.current.has("a")) x -= speed * dt;
      if (keys.current.has("ArrowRight") || keys.current.has("d")) x += speed * dt;
      if (keys.current.has("ArrowUp") || keys.current.has("w")) y -= speed * dt;
      if (keys.current.has("ArrowDown") || keys.current.has("s")) y += speed * dt;

      if (pointer.current) {
        const dx = pointer.current.x - x;
        const dy = pointer.current.y - y;
        const distance = Math.hypot(dx, dy);
        if (distance > 10) {
          x += (dx / distance) * speed * dt;
          y += (dy / distance) * speed * dt;
        }
      }

      x = Math.max(18, Math.min(viewWidth - 18, x));
      y = Math.max(18, Math.min(viewHeight - 18, y));
      ship.current = { x, y };
      place(shipRef.current, x, y);

      let hit: Stop | null = null;
      stops.current.forEach((stop, index) => {
        if (stop.caught) return;
        if (!reduce) {
          stop.x += stop.vx * dt;
          stop.y += stop.vy * dt;
          if (stop.x < 48 || stop.x > viewWidth - 48) stop.vx *= -1;
          if (stop.y < 28 || stop.y > viewHeight - 28) stop.vy *= -1;
        }
        place(stopRefs.current[index], stop.x, stop.y);
        if (Math.hypot(stop.x - x, stop.y - y) < 42) {
          stop.caught = true;
          hit = stop;
          const node = stopRefs.current[index];
          if (node) node.hidden = true;
        }
      });

      if (hit) {
        const found = hit as Stop;
        const total = stops.current.filter((stop) => stop.caught).length;
        setCaught(total);
        const done = total === runStops.length;
        if (done && !finished.current) {
          finished.current = true;
          setComplete(true);
        }
        setLatest(done ? "Log complete. Esc leaves." : `${found.year} ${found.place}`);
      }

      frameId.id = requestAnimationFrame(tick);
    };

    frameId.id = requestAnimationFrame(tick);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (!steerKeys.has(event.key)) return;
      keys.current.add(event.key);
      event.preventDefault();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current.delete(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(frameId.id);
      document.body.classList.remove("run-open");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onClose]);

  useEffect(() => {
    if (!complete) return;
    const timer = window.setTimeout(() => {
      const bounds = fieldRef.current?.getBoundingClientRect();
      const width = bounds?.width ?? window.innerWidth;
      const height = bounds?.height ?? window.innerHeight;
      stops.current.forEach((stop, index) => {
        stop.caught = false;
        const angle = (index / stops.current.length) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.32;
        stop.x = width / 2 + Math.cos(angle) * radius;
        stop.y = height / 2 + Math.sin(angle) * radius * 0.7;
        const node = stopRefs.current[index];
        if (node) node.hidden = false;
      });
      ship.current = { x: width / 2, y: height / 2 };
      finished.current = false;
      setCaught(0);
      setLatest("Arrows or drag. Collect the years.");
      setComplete(false);
    }, 8400);
    return () => window.clearTimeout(timer);
  }, [complete]);

  const track = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = fieldRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointer.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  return (
    <div
      className={complete ? "run run--complete" : "run"}
      role="dialog"
      aria-modal="true"
      aria-label="Signal run"
    >
      <div className="run__bar">
        <p className="run__count">
          {caught}/{runStops.length}
        </p>
        <p className="run__latest" role="status">
          {latest}
        </p>
        <button
          ref={leaveRef}
          type="button"
          className="run__leave"
          onClick={onClose}
        >
          Leave
        </button>
      </div>
      <div
        ref={fieldRef}
        className="run__field"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          track(event);
        }}
        onPointerMove={(event) => {
          if (pointer.current) track(event);
        }}
        onPointerUp={() => {
          pointer.current = null;
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
      >
        <div ref={shipRef} className="run__ship" aria-hidden="true" />
        {runStops.map((stop, index) => (
          <span
            key={stop.year}
            ref={(node) => {
              stopRefs.current[index] = node;
            }}
            className="run__stop"
          >
            {stop.year}
          </span>
        ))}
      </div>
      {complete && <FieldConfetti />}
    </div>
  );
};

export default SignalRun;
