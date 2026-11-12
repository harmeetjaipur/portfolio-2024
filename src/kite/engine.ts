import { snap } from "./sound";

export type FightStatus = { cut: number; total: number; latest: string };
export type RosterItem = { id: string; label: string; place: string };

type Callbacks = {
  onCut: (id: string) => void;
  onStatus: (status: FightStatus) => void;
  onDone: () => void;
};

type Pt = { x: number; y: number; px: number; py: number };
type P = { x: number; y: number };

type Word = {
  el: HTMLElement;
  x: number;
  y: number;
  r: number;
  rot: number;
  lift: number;
};

type Tag = { el: HTMLElement; id: string; x: number; y: number; w: number; h: number };

type Rival = RosterItem & {
  color: string;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  anchorX: number;
  phase: number;
  amp: number;
  speed: number;
  angle: number;
  state: "rising" | "flying" | "falling" | "gone";
  enter: number;
  contact: number;
  spark: P | null;
  vx: number;
  vy: number;
  spin: number;
  alpha: number;
  cutAt: P | null;
  line: P[];
};

type Fight = {
  queue: RosterItem[];
  rivals: Rival[];
  cut: number;
  total: number;
  spawnIn: number;
  doneIn: number | null;
};

type Popup = { text: string; gloss: string; sub: string; x: number; y: number; life: number };

const ROPE = 26;
const MAX_ALIVE = 3;
const ARROWS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};
const RIVAL_COLORS = ["#e0a33e", "#4f6aa8", "#5f8f6e", "#8a5fa8", "#d9774a", "#3f8f95"];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const ease = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);

const cross = (ax: number, ay: number, bx: number, by: number) => ax * by - ay * bx;

const intersect = (a: P, b: P, c: P, d: P): P | null => {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const den = cross(rx, ry, sx, sy);
  if (Math.abs(den) < 1e-6) return null;
  const qx = c.x - a.x;
  const qy = c.y - a.y;
  const t = cross(qx, qy, sx, sy) / den;
  const u = cross(qx, qy, rx, ry) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: a.x + rx * t, y: a.y + ry * t };
};

const nearest = (px: number, py: number, a: P, b: P) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = dx * dx + dy * dy || 1;
  const t = clamp(((px - a.x) * dx + (py - a.y) * dy) / len, 0, 1);
  const x = a.x + dx * t;
  const y = a.y + dy * t;
  return { x, y, d: Math.hypot(px - x, py - y) };
};

/**
 * One kite on a string over the whole page. Runs outside React: it owns a
 * fixed canvas, a drag handle, and writes small transforms onto words marked
 * `data-sway` and an `is-lit` class onto thread tags the kite rests on.
 */
export class KiteEngine {
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private size = 32;
  private t = 0;
  private last = 0;
  private frame = 0;
  private kite = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, homeX: 0, homeY: 0 };
  private dragging = false;
  private pointer = { x: 0, y: 0 };
  private grip = { x: 0, y: 0 };
  private press = { x: 0, y: 0, at: 0, homeX: 0, homeY: 0 };
  private cursor: P | null = null;
  private held = new Set<string>();
  private rope: Pt[] = [];
  private words: Word[] = [];
  private tags: Tag[] = [];
  private lit: string | null = null;
  private fight: Fight | null = null;
  private popups: Popup[] = [];
  private sound = false;
  private reduced: boolean;
  private ink = "#1d1a17";
  private paper = "#f6f1ea";
  private accent = "#c9636f";
  private deep = "#8f3542";
  private observer: ResizeObserver;
  private motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  private schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  private cleanups: (() => void)[] = [];

  constructor(
    private canvas: HTMLCanvasElement,
    private handle: HTMLElement,
    private cb: Callbacks
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D is not available");
    this.ctx = ctx;
    this.reduced = this.motionQuery.matches;
    this.observer = new ResizeObserver(() => this.measure());
  }

  start() {
    this.resize();
    this.readPalette();
    const k = this.kite;
    this.home();
    if (this.reduced) {
      k.x = k.homeX;
      k.y = k.homeY;
    } else {
      // Launch from the spool so the kite climbs into place on load.
      k.x = 70;
      k.y = this.h - 90;
    }
    this.resetRope();
    this.observer.observe(document.body);
    void document.fonts?.ready.then(() => this.measure());
    this.measure();
    this.bind();
    this.last = performance.now();
    this.frame = requestAnimationFrame(this.tick);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    this.cleanups.forEach((fn) => fn());
    this.words.forEach((word) => (word.el.style.transform = ""));
    this.tags.forEach((tag) => tag.el.classList.remove("is-lit"));
  }

  setSound(on: boolean) {
    this.sound = on;
  }

  startFight(roster: RosterItem[]) {
    this.fight = {
      queue: [...roster],
      rivals: [],
      cut: 0,
      total: roster.length,
      spawnIn: 0.4,
      doneIn: null,
    };
    this.popups = [];
    this.status("Cross a rival's string, then pull to cut it.");
  }

  stopFight() {
    this.fight = null;
    this.popups = [];
    this.held.clear();
  }

  private status(latest: string) {
    const f = this.fight;
    if (!f) return;
    this.cb.onStatus({ cut: f.cut, total: f.total, latest });
  }

  private home() {
    const small = this.w < 720;
    this.kite.homeX = this.w * (small ? 0.76 : 0.74);
    this.kite.homeY = this.h * (small ? 0.2 : 0.3);
  }

  private get anchor(): P {
    return { x: 30, y: this.h - 30 };
  }

  private resetRope() {
    const a = this.anchor;
    const b = this.bridle();
    this.rope = Array.from({ length: ROPE }, (_, i) => {
      const f = i / (ROPE - 1);
      const x = a.x + (b.x - a.x) * f;
      const y = a.y + (b.y - a.y) * f;
      return { x, y, px: x, py: y };
    });
  }

  private bridle(): P {
    const { x, y, angle } = this.kite;
    const off = this.size * 0.18;
    return { x: x - Math.sin(angle) * off, y: y + Math.cos(angle) * off };
  }

  private readPalette() {
    const css = getComputedStyle(document.documentElement);
    const pick = (name: string, fallback: string) =>
      css.getPropertyValue(name).trim() || fallback;
    this.ink = pick("--ink", this.ink);
    this.paper = pick("--paper", this.paper);
    this.accent = pick("--kite", this.accent);
    this.deep = pick("--kite-deep", this.deep);
  }

  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.size = this.w < 720 ? 25 : 32;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const m = this.size * 1.4;
    this.kite.homeX = clamp(this.kite.homeX, m, this.w - m);
    this.kite.homeY = clamp(this.kite.homeY, m + 40, this.h - m * 2.5);
  }

  /** Cache page positions of swaying words and thread tags. */
  private measure() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    const words = Array.from(document.querySelectorAll<HTMLElement>("[data-sway]"));
    words.forEach((el) => (el.style.transform = ""));
    this.words = words.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        el,
        x: r.left + r.width / 2 + sx,
        y: r.top + r.height / 2 + sy,
        r: Math.min(r.width, r.height) / 2,
        rot: 0,
        lift: 0,
      };
    });
    this.tags = Array.from(document.querySelectorAll<HTMLElement>("[data-tag]")).map(
      (el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          id: el.dataset.tag ?? "",
          x: r.left + sx,
          y: r.top + sy,
          w: r.width,
          h: r.height,
        };
      }
    );
  }

  private bind() {
    const on = <K extends keyof WindowEventMap>(
      target: Window,
      type: K,
      fn: (e: WindowEventMap[K]) => void,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, fn, opts);
      this.cleanups.push(() => target.removeEventListener(type, fn, opts));
    };
    const onHandle = <K extends keyof HTMLElementEventMap>(
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void
    ) => {
      this.handle.addEventListener(type, fn);
      this.cleanups.push(() => this.handle.removeEventListener(type, fn));
    };

    on(window, "resize", () => {
      this.resize();
      this.measure();
    });

    on(
      window,
      "pointermove",
      (e) => {
        if (e.pointerType === "mouse") this.cursor = { x: e.clientX, y: e.clientY };
      },
      { passive: true }
    );
    const leave = () => (this.cursor = null);
    document.addEventListener("pointerleave", leave);
    this.cleanups.push(() => document.removeEventListener("pointerleave", leave));

    onHandle("pointerdown", (e) => {
      e.preventDefault();
      this.handle.setPointerCapture(e.pointerId);
      this.dragging = true;
      this.pointer = { x: e.clientX, y: e.clientY };
      this.grip = { x: e.clientX - this.kite.x, y: e.clientY - this.kite.y };
      this.press = {
        x: e.clientX,
        y: e.clientY,
        at: performance.now(),
        homeX: this.kite.homeX,
        homeY: this.kite.homeY,
      };
      document.documentElement.classList.add("is-dragging");
    });
    onHandle("pointermove", (e) => {
      if (this.dragging) this.pointer = { x: e.clientX, y: e.clientY };
    });
    const release = (e: PointerEvent) => {
      if (!this.dragging) return;
      this.dragging = false;
      document.documentElement.classList.remove("is-dragging");
      const k = this.kite;

      // A tap, not a drag: leave the kite where it was and pass the click
      // to whatever sits under it, so the kite never blocks a link.
      const moved = Math.hypot(e.clientX - this.press.x, e.clientY - this.press.y);
      if (e.type === "pointerup" && moved < 6 && performance.now() - this.press.at < 350) {
        k.homeX = this.press.homeX;
        k.homeY = this.press.homeY;
        this.handle.style.pointerEvents = "none";
        const below = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        this.handle.style.pointerEvents = "";
        if (below && below !== this.canvas) {
          below.click();
          if (below.matches("input, textarea, select, a, button")) below.focus();
        }
        return;
      }

      document.documentElement.classList.add("has-flown");
      // Where it lands depends on how hard it was thrown.
      const m = this.size * 1.4;
      k.homeX = clamp(k.x + k.vx * 0.32, m, this.w - m);
      k.homeY = clamp(k.y + k.vy * 0.32, m + 40, this.h - m * 2.5);
    };
    onHandle("pointerup", release);
    onHandle("pointercancel", release);
    onHandle("blur", () => this.held.clear());

    on(window, "keydown", (e) => {
      if (!(e.key in ARROWS)) return;
      if (!this.fight && document.activeElement !== this.handle) return;
      e.preventDefault();
      this.held.add(e.key);
      document.documentElement.classList.add("has-flown");
    });
    on(window, "keyup", (e) => this.held.delete(e.key));

    const motion = () => (this.reduced = this.motionQuery.matches);
    const scheme = () => this.readPalette();
    this.motionQuery.addEventListener("change", motion);
    this.schemeQuery.addEventListener("change", scheme);
    const themeWatch = new MutationObserver(scheme);
    themeWatch.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    this.cleanups.push(() => {
      themeWatch.disconnect();
      this.motionQuery.removeEventListener("change", motion);
      this.schemeQuery.removeEventListener("change", scheme);
    });
  }

  private tick = (now: number) => {
    const dt = Math.min(1 / 30, (now - this.last) / 1000) || 1 / 60;
    this.last = now;
    this.t += dt;
    this.stepKite(dt);
    this.stepRope(dt);
    if (this.fight) this.stepFight(dt);
    this.stepPage(dt);
    this.draw(dt);
    this.frame = requestAnimationFrame(this.tick);
  };

  private stepKite(dt: number) {
    const k = this.kite;
    const m = this.size * 1.4;

    if (this.held.size) {
      let dx = 0;
      let dy = 0;
      this.held.forEach((key) => {
        dx += ARROWS[key][0];
        dy += ARROWS[key][1];
      });
      k.homeX = clamp(k.homeX + dx * 420 * dt, m, this.w - m);
      k.homeY = clamp(k.homeY + dy * 420 * dt, m + 40, this.h - m * 2.5);
    }

    if (this.dragging) {
      const tx = this.pointer.x - this.grip.x;
      const ty = this.pointer.y - this.grip.y;
      const nx = k.x + (tx - k.x) * Math.min(1, dt * 28);
      const ny = k.y + (ty - k.y) * Math.min(1, dt * 28);
      k.vx += ((nx - k.x) / dt - k.vx) * 0.35;
      k.vy += ((ny - k.y) / dt - k.vy) * 0.35;
      k.x = nx;
      k.y = ny;
    } else {
      let hx = k.homeX;
      let hy = k.homeY;
      if (!this.reduced) {
        hx += Math.sin(this.t * 0.62) * 16 + Math.sin(this.t * 1.7) * 5;
        hy += Math.sin(this.t * 0.9 + 1) * 10;
        if (this.cursor) {
          hx += clamp((this.cursor.x - k.homeX) * 0.06, -36, 36);
          hy += clamp((this.cursor.y - k.homeY) * 0.04, -24, 24);
        }
      }
      k.vx += ((hx - k.x) * 7 - k.vx * 3.2) * dt;
      k.vy += ((hy - k.y) * 7 - k.vy * 3.2) * dt;
      k.x += k.vx * dt;
      k.y += k.vy * dt;
    }

    if (k.x < m || k.x > this.w - m) {
      k.x = clamp(k.x, m, this.w - m);
      k.vx *= -0.3;
    }
    if (k.y < m || k.y > this.h - m) {
      k.y = clamp(k.y, m, this.h - m);
      k.vy *= -0.3;
    }

    const sway = this.reduced ? 0 : Math.sin(this.t * 1.9) * 0.05;
    const target = clamp(k.vx / 900, -0.55, 0.55) + sway;
    k.angle += (target - k.angle) * Math.min(1, dt * 6);

    this.handle.style.transform = `translate(${k.x.toFixed(1)}px, ${k.y.toFixed(1)}px)`;
  }

  private stepRope(dt: number) {
    const a = this.anchor;
    const b = this.bridle();
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const seg = (dist * 1.05 + 24) / (ROPE - 1);
    const gravity = 420 * dt * dt;
    const wind = this.reduced ? 0 : Math.sin(this.t * 0.8) * 30 * dt * dt;

    for (let i = 1; i < ROPE - 1; i++) {
      const p = this.rope[i];
      const vx = (p.x - p.px) * 0.985;
      const vy = (p.y - p.py) * 0.985;
      p.px = p.x;
      p.py = p.y;
      p.x += vx + wind;
      p.y += vy + gravity;
    }

    const first = this.rope[0];
    const end = this.rope[ROPE - 1];
    for (let n = 0; n < 14; n++) {
      first.x = a.x;
      first.y = a.y;
      end.x = b.x;
      end.y = b.y;
      for (let i = 0; i < ROPE - 1; i++) {
        const p = this.rope[i];
        const q = this.rope[i + 1];
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const d = Math.hypot(dx, dy) || 0.0001;
        const diff = (d - seg) / d;
        const pinP = i === 0;
        const pinQ = i + 1 === ROPE - 1;
        if (pinP && pinQ) continue;
        if (pinP) {
          q.x -= dx * diff;
          q.y -= dy * diff;
        } else if (pinQ) {
          p.x += dx * diff;
          p.y += dy * diff;
        } else {
          p.x += dx * diff * 0.5;
          p.y += dy * diff * 0.5;
          q.x -= dx * diff * 0.5;
          q.y -= dy * diff * 0.5;
        }
      }
    }
    first.x = a.x;
    first.y = a.y;
    end.x = b.x;
    end.y = b.y;
  }

  /** Words lean away from the string; thread tags light under the kite. */
  private stepPage(dt: number) {
    const sx = window.scrollX;
    const sy = window.scrollY;
    const k = this.kite;

    if (!this.reduced) {
      const ease = Math.min(1, dt * 9);
      for (const word of this.words) {
        const vx = word.x - sx;
        const vy = word.y - sy;
        let targetRot = 0;
        let targetLift = 0;
        if (vy > -80 && vy < this.h + 80) {
          let best = { x: 0, y: 0, d: Infinity };
          for (let i = 0; i < ROPE - 1; i++) {
            const hit = nearest(vx, vy, this.rope[i], this.rope[i + 1]);
            if (hit.d < best.d) best = hit;
          }
          const kd = Math.hypot(vx - k.x, vy - k.y) - this.size * 0.6;
          if (kd < best.d) best = { x: k.x, y: k.y, d: kd };
          const reach = Math.max(70, word.r * 1.4);
          const pull = clamp(1 - (best.d - word.r * 0.4) / reach, 0, 1);
          const side = vx < best.x ? -1 : 1;
          targetRot = pull * pull * 10 * side;
          targetLift = -pull * pull * 8;
        }
        const rot = word.rot + (targetRot - word.rot) * ease;
        const lift = word.lift + (targetLift - word.lift) * ease;
        if (Math.abs(rot - word.rot) > 0.01 || Math.abs(lift - word.lift) > 0.01) {
          word.rot = rot;
          word.lift = lift;
          word.el.style.transform =
            Math.abs(rot) < 0.02 && Math.abs(lift) < 0.02
              ? ""
              : `translateY(${lift.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
        }
      }
    }

    const px = k.x + sx;
    const py = k.y + sy;
    let lit: Tag | null = null;
    for (const tag of this.tags) {
      if (
        px > tag.x - 12 &&
        px < tag.x + tag.w + 12 &&
        py > tag.y - 12 &&
        py < tag.y + tag.h + 12
      ) {
        lit = tag;
        break;
      }
    }
    const id = lit?.id ?? null;
    if (id !== this.lit) {
      this.tags.forEach((tag) => tag.el.classList.toggle("is-lit", tag.id === id));
      this.lit = id;
    }
  }

  private spawn(item: RosterItem, index: number) {
    const k = this.kite;
    let homeX = 0;
    let homeY = 0;
    for (let tries = 0; tries < 10; tries++) {
      homeX = rand(this.w * 0.12, this.w * 0.88);
      homeY = rand(this.h * 0.28, this.h * 0.6);
      const clear =
        Math.hypot(homeX - k.x, homeY - k.y) > 160 &&
        (this.fight?.rivals ?? []).every(
          (r) => r.state === "falling" || Math.hypot(homeX - r.homeX, homeY - r.homeY) > 220
        );
      if (clear) break;
    }
    const rival: Rival = {
      ...item,
      color: RIVAL_COLORS[index % RIVAL_COLORS.length],
      x: homeX,
      y: this.h + 60,
      homeX,
      homeY,
      anchorX: clamp(homeX + rand(-0.3, 0.3) * this.w, 60, this.w - 20),
      phase: rand(0, Math.PI * 2),
      amp: this.reduced ? 0 : rand(40, 90),
      speed: rand(0.35, 0.6),
      angle: 0,
      state: "rising",
      enter: 0,
      contact: 0,
      spark: null,
      vx: 0,
      vy: 0,
      spin: 0,
      alpha: 1,
      cutAt: null,
      line: [],
    };
    this.fight?.rivals.push(rival);
  }

  private stepFight(dt: number) {
    const f = this.fight;
    if (!f) return;
    const k = this.kite;
    const speed = Math.hypot(k.vx, k.vy);
    const s = this.size * 0.85;

    const alive = f.rivals.filter((r) => r.state === "rising" || r.state === "flying").length;
    if (f.queue.length && alive < MAX_ALIVE) {
      f.spawnIn -= dt;
      if (f.spawnIn <= 0) {
        const item = f.queue.shift();
        if (item) this.spawn(item, f.total - f.queue.length - 1);
        f.spawnIn = 0.9;
      }
    }

    for (const r of f.rivals) {
      if (r.state === "rising" || r.state === "flying") {
        if (r.state === "rising") {
          r.enter += dt * 0.6;
          if (r.enter >= 1) r.state = "flying";
        }
        const fx = r.homeX + Math.sin(this.t * r.speed + r.phase) * r.amp;
        const fy = r.homeY + Math.sin(this.t * r.speed * 1.3 + r.phase * 2) * r.amp * 0.45;
        const e = ease(r.enter);
        r.x = fx;
        r.y = this.h + 60 + (fy - this.h - 60) * e;
        r.angle = Math.cos(this.t * r.speed + r.phase) * 0.22;

        const bx = r.x - Math.sin(r.angle) * s * 0.18;
        const by = r.y + Math.cos(r.angle) * s * 0.18;
        const ax = r.anchorX;
        const ay = this.h + 30;
        const cx = (ax + bx) / 2 + 30;
        const cy = (ay + by) / 2 + 60;
        r.line = Array.from({ length: 11 }, (_, i) => {
          const t = i / 10;
          const u = 1 - t;
          return {
            x: u * u * ax + 2 * u * t * cx + t * t * bx,
            y: u * u * ay + 2 * u * t * cy + t * t * by,
          };
        });

        let hit: P | null = null;
        if (r.enter > 0.6) {
          outer: for (let i = 0; i < ROPE - 1; i++) {
            for (let j = 0; j < r.line.length - 1; j++) {
              const p = intersect(this.rope[i], this.rope[i + 1], r.line[j], r.line[j + 1]);
              if (p) {
                hit = p;
                break outer;
              }
            }
          }
        }
        r.spark = hit;
        r.contact = hit
          ? r.contact + dt * (0.25 + speed / 300)
          : Math.max(0, r.contact - dt * 0.8);

        if (hit && r.contact >= 0.6) {
          r.state = "falling";
          r.cutAt = { ...hit };
          r.vx = k.vx * 0.15 + rand(-50, 50);
          r.vy = -70;
          r.spin = rand(-3, 3);
          f.cut += 1;
          this.popups.push({
            text: "Wo kata!",
            gloss: "“that one’s cut!”",
            sub: `${r.label} · ${r.place}`,
            x: r.x,
            y: r.y - s * 1.6,
            life: 0,
          });
          if (this.sound) snap();
          this.cb.onCut(r.id);
          if (f.cut === f.total) {
            f.doneIn = 3.6;
            this.status("Clear skies. Every year, cut loose.");
          } else {
            this.status(
              f.cut === 1
                ? `Wo kata! Hindi for “that one’s cut!” · ${r.label} ${r.place}`
                : `Wo kata! ${r.label} · ${r.place}`
            );
          }
        }
      } else if (r.state === "falling") {
        r.vy += 150 * dt;
        r.vx *= 0.99;
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.angle += r.spin * dt;
        r.alpha -= dt * 0.42;
        if (r.cutAt) r.cutAt.y += 220 * dt;
        if (r.alpha <= 0 || r.y > this.h + 80) r.state = "gone";
      }
    }
    f.rivals = f.rivals.filter((r) => r.state !== "gone");

    if (f.doneIn !== null) {
      f.doneIn -= dt;
      if (f.doneIn <= 0) {
        f.doneIn = null;
        this.cb.onDone();
      }
    }
  }

  private draw(dt: number) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    if (this.fight) {
      for (const r of this.fight.rivals) this.drawRival(r);
    }

    // The string, smoothed through its midpoints.
    ctx.save();
    ctx.strokeStyle = this.ink;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.rope[0].x, this.rope[0].y);
    for (let i = 1; i < ROPE - 1; i++) {
      const p = this.rope[i];
      const q = this.rope[i + 1];
      ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
    }
    const end = this.rope[ROPE - 1];
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();

    this.drawSpool();

    const k = this.kite;
    const scale = this.dragging ? 1.08 : 1;
    this.drawKite(k.x, k.y, k.angle, this.size * scale, this.accent, this.deep, 1);

    if (this.popups.length) {
      ctx.save();
      ctx.textAlign = "center";
      for (const p of this.popups) {
        p.life += dt;
        p.y -= 26 * dt;
        ctx.globalAlpha = clamp(1.25 - p.life / 2.4, 0, 1);
        ctx.fillStyle = this.deep;
        ctx.font = `italic 34px "Instrument Serif", Georgia, serif`;
        ctx.fillText(p.text, p.x, p.y);
        ctx.fillStyle = this.ink;
        ctx.font = `italic 17px "Instrument Serif", Georgia, serif`;
        ctx.fillText(p.gloss, p.x, p.y + 20);
        ctx.font = `500 11px "JetBrains Mono", ui-monospace, monospace`;
        ctx.fillText(p.sub.toUpperCase(), p.x, p.y + 38);
      }
      ctx.restore();
      this.popups = this.popups.filter((p) => p.life < 3);
    }
  }

  private drawSpool() {
    const ctx = this.ctx;
    const { x, y } = this.anchor;
    ctx.save();
    ctx.strokeStyle = this.ink;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.rotate(0);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + this.t * 0.2;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * 3, y + Math.sin(a) * 3);
      ctx.lineTo(x + Math.cos(a) * 9, y + Math.sin(a) * 9);
      ctx.stroke();
    }
    ctx.fillStyle = this.accent;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawRival(r: Rival) {
    const ctx = this.ctx;
    const s = this.size * 0.85;
    ctx.save();
    ctx.globalAlpha = r.alpha;
    ctx.lineCap = "round";

    if (r.state === "falling") {
      // The cut end drops away below; the kite trails a short loose end.
      if (r.cutAt && r.line.length) {
        ctx.strokeStyle = this.ink;
        ctx.globalAlpha = r.alpha * 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(r.line[0].x, r.line[0].y);
        ctx.quadraticCurveTo(
          (r.line[0].x + r.cutAt.x) / 2,
          Math.max(r.line[0].y, r.cutAt.y) + 40,
          r.cutAt.x,
          r.cutAt.y
        );
        ctx.stroke();
      }
      ctx.globalAlpha = r.alpha * 0.5;
      ctx.strokeStyle = this.ink;
      ctx.beginPath();
      ctx.moveTo(r.x, r.y + s * 0.2);
      ctx.quadraticCurveTo(r.x - r.vx * 0.2 + 12, r.y - 30, r.x - r.vx * 0.35, r.y - 70);
      ctx.stroke();
    } else if (r.line.length) {
      const hot = clamp(r.contact / 0.6, 0, 1);
      ctx.strokeStyle = hot > 0 ? this.accent : this.ink;
      ctx.globalAlpha = 0.32 + hot * 0.5;
      ctx.lineWidth = 1 + hot * 0.8;
      ctx.beginPath();
      ctx.moveTo(r.line[0].x, r.line[0].y);
      for (const p of r.line) ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (r.spark) {
        ctx.globalAlpha = 0.5 + hot * 0.5;
        ctx.fillStyle = this.accent;
        ctx.beginPath();
        ctx.arc(r.spark.x, r.spark.y, 2.5 + hot * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    this.drawKite(r.x, r.y, r.angle, s, r.color, this.shade(r.color), r.alpha);

    if (r.state !== "falling") {
      ctx.save();
      ctx.globalAlpha = 0.75 * r.alpha;
      ctx.fillStyle = this.ink;
      ctx.textAlign = "center";
      ctx.font = `500 11px "JetBrains Mono", ui-monospace, monospace`;
      ctx.fillText(r.label, r.x, r.y - s * 1.25);
      ctx.restore();
    }
  }

  private shade(hex: string) {
    const n = parseInt(hex.slice(1), 16);
    const f = 0.62;
    const r = Math.round(((n >> 16) & 255) * f);
    const g = Math.round(((n >> 8) & 255) * f);
    const b = Math.round((n & 255) * f);
    return `rgb(${r}, ${g}, ${b})`;
  }

  /** A patang: a diamond with a bowed spar, a spine, and a small tail. */
  private drawKite(
    x: number,
    y: number,
    angle: number,
    s: number,
    fill: string,
    deep: string,
    alpha: number
  ) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);

    const top = { x: 0, y: -s };
    const right = { x: s * 0.86, y: -s * 0.08 };
    const bottom = { x: 0, y: s * 0.92 };
    const left = { x: -s * 0.86, y: -s * 0.08 };

    ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(right.x, right.y);
    ctx.lineTo(bottom.x, bottom.y);
    ctx.lineTo(left.x, left.y);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = "transparent";

    // Lower panel in the deeper tone.
    ctx.fillStyle = deep;
    ctx.globalAlpha = alpha * 0.55;
    ctx.beginPath();
    ctx.moveTo(left.x * 0.46, s * 0.4);
    ctx.lineTo(right.x * 0.46, s * 0.4);
    ctx.lineTo(bottom.x, bottom.y);
    ctx.closePath();
    ctx.fill();

    // Inner diamond in paper.
    ctx.globalAlpha = alpha * 0.9;
    ctx.fillStyle = this.paper;
    const c = -s * 0.1;
    const q = s * 0.3;
    ctx.beginPath();
    ctx.moveTo(0, c - q);
    ctx.lineTo(q * 0.86, c);
    ctx.lineTo(0, c + q);
    ctx.lineTo(-q * 0.86, c);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = alpha;
    ctx.strokeStyle = deep;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(bottom.x, bottom.y);
    ctx.moveTo(left.x, left.y);
    ctx.quadraticCurveTo(0, -s * 0.62, right.x, right.y);
    ctx.stroke();

    ctx.fillStyle = deep;
    ctx.beginPath();
    ctx.moveTo(0, bottom.y - 2);
    ctx.lineTo(-s * 0.24, bottom.y + s * 0.34);
    ctx.lineTo(s * 0.24, bottom.y + s * 0.34);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}
