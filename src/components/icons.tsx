import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M4 12h15m-6-7 7 7-7 7" />
    </svg>
  );
}

export function EyeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M5.5 4h4l1.5 4.5-2.2 1.6a12.5 12.5 0 0 0 5.1 5.1l1.6-2.2L20 14.5v4a1.9 1.9 0 0 1-2.1 1.9C10.4 19.6 4.4 13.6 3.6 6.1A1.9 1.9 0 0 1 5.5 4Z" />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.7" r="2.3" />
    </svg>
  );
}

export function CopyIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5" />
    </svg>
  );
}

export function ExternalIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M14 4.5h5.5V10M19.5 4.5l-8 8M9 5.5H6A1.5 1.5 0 0 0 4.5 7v11A1.5 1.5 0 0 0 6 19.5h11a1.5 1.5 0 0 0 1.5-1.5v-3" />
    </svg>
  );
}

export function PlayIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function RefreshIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M4.5 12a7.5 7.5 0 0 1 13-5.2L20 9M20 4.5V9h-4.5M19.5 12a7.5 7.5 0 0 1-13 5.2L4 15M4 19.5V15h4.5" />
    </svg>
  );
}

export function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function UserIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.5c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8" />
    </svg>
  );
}

export function HomeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="m4 11 8-6.5L20 11v8.5a1 1 0 0 1-1 1h-5V15h-4v5.5H5a1 1 0 0 1-1-1V11Z" />
    </svg>
  );
}

export function CodeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="m8 8-4.5 4L8 16m8-8 4.5 4L16 16m-2.5-9.5-3 11" />
    </svg>
  );
}

export function PenIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="m14.5 5 4.5 4.5L8.5 20H4v-4.5L14.5 5Z" />
      <path d="m12.5 7 4.5 4.5" />
    </svg>
  );
}

export function FilmIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l4 4V5L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M15 9a4 4 0 0 1 0 6m2.5-9.5a8 8 0 0 1 0 13" />
    </svg>
  );
}

export function BlogIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <path d="M5 4.5h11A2.5 2.5 0 0 1 18.5 7v12.5H7A2.5 2.5 0 0 1 4.5 17V5a.5.5 0 0 1 .5-.5Z" />
      <path d="M8 9h6.5M8 12.5h6.5M8 16h4" />
    </svg>
  );
}

/** مربعان متداخلان — توقيع "دوبليكس" (الثنائية) */
export function DuplexMarkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" fill="currentColor" opacity="0.35" />
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function Spark({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1.5c.9 5.6 2.4 8.3 3.9 9.4 1.3 1 3.4 1.1 6.6 1.1-5.6.9-8.3 2.4-9.4 3.9-1 1.3-1.1 3.4-1.1 6.6-.9-5.6-2.4-8.3-3.9-9.4-1.3-1-3.4-1.1-6.6-1.1 5.6-.9 8.3-2.4 9.4-3.9 1-1.3 1.1-3.4 1.1-6.6Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5A9.4 9.4 0 0 0 3.9 16.7L2.6 21.4l4.8-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17.1a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A7.7 7.7 0 1 1 12 19.6Zm4.2-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.2-.1 3.7a10.5 10.5 0 0 0 4.6 3.9c1.9.8 2.7.8 3.5.6.6-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...S} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BehanceIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.3 11.3c.9-.5 1.5-1.3 1.5-2.4 0-2-1.6-2.9-3.9-2.9H2.5v11.9h4.6c2.5 0 4.6-1.1 4.6-3.7 0-1.4-.7-2.4-2.4-2.9ZM5 8h1.7c1 0 1.8.3 1.8 1.4 0 1-.7 1.4-1.7 1.4H5V8Zm1.9 7.9H5v-3.2h2c1.2 0 2 .5 2 1.6 0 1.2-.9 1.6-2.1 1.6Zm11.9-7.6c-3 0-4.9 2-4.9 5s1.9 5 4.9 5c2.4 0 3.9-1.2 4.4-3h-2.3c-.3.6-.9 1-2 1-1.4 0-2.3-.8-2.4-2.2h6.8v-.7c0-3-1.6-5.1-4.5-5.1Zm-2.4 4c.2-1.2 1-1.9 2.3-1.9 1.4 0 2.1.7 2.2 1.9h-4.5Zm-.6-6.3h5.6v1.4h-5.6V6Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.5 8.8H3.7V21h2.8V8.8ZM5.1 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.5 13.9c0-3.2-1.7-4.9-4.2-4.9-1.6 0-2.6.8-3.1 1.7V8.8h-2.8V21h2.8v-6.4c0-1.5.7-2.4 2-2.4 1.2 0 1.8.8 1.8 2.4V21h2.8l.7-7.1Z" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.7 3.5h3l-6.6 7.6 7.8 9.4h-6.1l-4.8-5.8-5.5 5.8h-3l7.1-8.1-7.5-8.9h6.3l4.3 5.3 5-5.3Zm-1.1 15.2h1.7L7.9 5.2H6.1l10.5 13.5Z" />
    </svg>
  );
}

export const SOCIAL_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  instagram: InstagramIcon,
  behance: BehanceIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};
