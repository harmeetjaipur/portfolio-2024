import { FormEvent, useEffect, useState } from "react";
import { useDeck } from "./deck";
import { logSize } from "./experience";

const sectors = [
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "skills", label: "Skills" },
];

const jumps: Record<string, string> = {
  about: "about",
  me: "about",
  work: "experience",
  experience: "experience",
  log: "experience",
  skills: "skills",
  skill: "skills",
};

type HudProps = {
  activeSection: string;
  running: boolean;
  onJump: (id: string) => void;
  onRun: () => void;
};

/**
 * Corner readout for the current sector, timeline years on screen,
 * scroll signal, and a short command line.
 */
const Hud: React.FC<HudProps> = ({ activeSection, running, onJump, onRun }) => {
  const { visited } = useDeck();
  const [signal, setSignal] = useState(0);
  const [span, setSpan] = useState("standby");
  const [command, setCommand] = useState("");
  const [note, setNote] = useState("");
  const logged = Math.round((visited.length / logSize) * 100);

  const sector =
    sectors.find((item) => item.id === activeSection) ?? sectors[0];

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
      setSignal(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const publish = () => {
      const visible = [...ratios.entries()]
        .filter(([, ratio]) => ratio > 0.15)
        .sort((a, b) => b[1] - a[1]);

      setSpan(visible[0]?.[0] ?? "standby");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const year = (entry.target as HTMLElement).dataset.year;
          if (!year) return;
          if (entry.isIntersecting) ratios.set(year, entry.intersectionRatio);
          else ratios.delete(year);
        });
        publish();
      },
      { threshold: [0.15, 0.4, 0.7] }
    );

    document.querySelectorAll<HTMLElement>("[data-year]").forEach((entry) => {
      observer.observe(entry);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (running) return;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      const target = event.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable ||
        target.closest("a, button")
      ) {
        return;
      }

      event.preventDefault();
      const index = Math.max(
        0,
        sectors.findIndex((item) => item.id === activeSection)
      );
      const next =
        event.key === "ArrowDown"
          ? sectors[Math.min(sectors.length - 1, index + 1)]
          : sectors[Math.max(0, index - 1)];
      onJump(next.id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSection, onJump, running]);

  const run = (event: FormEvent) => {
    event.preventDefault();
    const typed = command.trim().toLowerCase();
    if (!typed) return;

    if (typed === "run") {
      setCommand("");
      setNote("");
      onRun();
      return;
    }

    if (typed === "mail" || typed === "email") {
      setNote("opening mail");
      window.location.href = "mailto:hello@findharmeet.ca";
      setCommand("");
      return;
    }

    const id = jumps[typed];
    if (!id) {
      setNote("no match");
      return;
    }

    onJump(id);
    setNote(`locked on ${sectors.find((item) => item.id === id)?.label}`);
    setCommand("");
  };

  return (
    <aside className="hud" aria-label="Deck status">
      <p className="hud__row">
        <span className="hud__key">Sector</span>
        <span className="hud__value">
          {String(sectors.indexOf(sector) + 1).padStart(2, "0")} {sector.label}
        </span>
      </p>
      <p className="hud__row">
        <span className="hud__key">Span</span>
        <span className="hud__value">{span}</span>
      </p>
      <div
        className="hud__meter"
        role="meter"
        aria-label="Signal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={signal}
      >
        <span className="hud__key">Signal</span>
        <span className="hud__track" aria-hidden="true">
          <span className="hud__fill" style={{ width: `${signal}%` }} />
        </span>
        <span className="hud__pct">{signal}</span>
      </div>
      <div
        className="hud__meter"
        role="meter"
        aria-label="Log opened"
        aria-valuemin={0}
        aria-valuemax={logSize}
        aria-valuenow={visited.length}
        aria-valuetext={`${visited.length} of ${logSize} roles opened`}
      >
        <span className="hud__key">Log</span>
        <span className="hud__track" aria-hidden="true">
          <span className="hud__fill" style={{ width: `${logged}%` }} />
        </span>
        <span className="hud__pct">
          {visited.length}/{logSize}
        </span>
      </div>
      <form className="hud__form" onSubmit={run}>
        <label className="hud__prompt" htmlFor="hud-command">
          &gt;
        </label>
        <input
          id="hud-command"
          className="hud__input"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          placeholder="about, work, skills, mail"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
      <p className="hud__note" role="status">
        {note}
      </p>
    </aside>
  );
};

export default Hud;
