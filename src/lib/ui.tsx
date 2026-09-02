import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { DuplexMarkIcon } from "../components/icons";

/* ------------------------- useInView ------------------------- */
export function useInView<T extends HTMLElement>(
  threshold = 0.18
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ------------------------- Reveal ------------------------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      className={`${inView ? "is-revealed" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ------------------------- CountUp ------------------------- */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((value * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------- Spark icon ------------------------- */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1.5c.9 5.6 2.4 8.3 3.9 9.4 1.3 1 3.4 1.1 6.6 1.1-5.6.9-8.3 2.4-9.4 3.9-1 1.3-1.1 3.4-1.1 6.6-.9-5.6-2.4-8.3-3.9-9.4-1.3-1-3.4-1.1-6.6-1.1 5.6-.9 8.3-2.4 9.4-3.9 1-1.3 1.1-3.4 1.1-6.6Z" />
    </svg>
  );
}

/* ------------------------- Marquee ------------------------- */
export function Marquee({
  items,
  dark = false,
  slow = false,
}: {
  items: string[];
  dark?: boolean;
  slow?: boolean;
}) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display whitespace-nowrap px-6 text-lg font-bold tracking-wide md:text-xl">
            {item}
          </span>
          <DuplexMarkIcon
            className={`h-4 w-4 shrink-0 ${dark ? "text-flame" : "text-teal"}`}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      dir="ltr"
      className={`marquee-paused overflow-hidden border-y ${
        dark ? "border-paper/10 bg-ink text-paper" : "border-line bg-surface text-ink"
      } py-4`}
    >
      <div className={`marquee-track ${slow ? "marquee-slow" : ""}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ------------------------- Rotating badge ------------------------- */
export function RotatingBadge({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
        <defs>
          <path id="badge-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-ink" />
        <text className="fill-paper" style={{ fontSize: "10.5px", letterSpacing: "2.6px" }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Spark className="h-6 w-6 text-flame" />
      </div>
    </div>
  );
}

/* ------------------------- Section heading ------------------------- */
export function SectionHead({
  kicker,
  title,
  sub,
  end,
  light = false,
}: {
  kicker: string;
  title: string;
  sub?: string;
  end?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
      <div className="max-w-2xl">
        <p
          className={`mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase ${
            light ? "text-teal-tint/70" : "text-teal"
          }`}
        >
          <span className={`h-px w-10 ${light ? "bg-flame" : "bg-teal"}`} />
          {kicker}
        </p>
        <h2
          className={`font-display text-3xl leading-[1.15] font-extrabold md:text-5xl ${
            light ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {sub && (
          <p className={`mt-4 max-w-xl leading-relaxed ${light ? "text-paper/70" : "text-muted"}`}>
            {sub}
          </p>
        )}
      </div>
      {end}
    </div>
  );
}
