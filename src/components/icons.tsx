import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PlayIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.52.86l10.4-6.5a1 1 0 0 0 0-1.72L9.52 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function ExternalIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M14 5h5v5" />
      <path d="M19 5l-8.5 8.5" />
      <path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 7h16M4 12h10M4 17h16" />
    </svg>
  );
}

export function GlobeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.1 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.1-3.9-8.5s1.3-6.2 3.9-8.5Z" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M5.5 4h3l1.7 4.3-2 1.6a12.5 12.5 0 0 0 5.9 5.9l1.6-2L20 15.5v3a1.9 1.9 0 0 1-2.1 1.9C10.4 19.7 4.3 13.6 3.6 6.1A1.9 1.9 0 0 1 5.5 4Z" />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.5a6.5 6.5 0 0 1 6.5 6.3C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9 8.8c-.3 2.5 3.6 6.5 6.2 6.2l.6-1.6-2-1-.9.7c-1-.4-1.7-1.1-2.1-2.1l.7-.9-1-2-1.5.7Z" />
    </svg>
  );
}

export function LockIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  );
}

export function RefreshIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 3.5V8h-4.5" />
    </svg>
  );
}

export function CopyIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M5.5 14.5h-.4a1.6 1.6 0 0 1-1.6-1.6V5.6A1.6 1.6 0 0 1 5.1 4h7.3a1.6 1.6 0 0 1 1.6 1.6v.4" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BehanceIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8.6 11.2c.9-.4 1.5-1.2 1.5-2.3 0-2-1.5-2.9-3.7-2.9H2v12h4.6c2.3 0 4.3-1.1 4.3-3.6 0-1.5-.8-2.7-2.3-3.2ZM4.4 8h1.8c.9 0 1.6.3 1.6 1.3 0 .9-.6 1.3-1.5 1.3H4.4V8Zm2 8H4.4v-3.2h2.1c1.1 0 1.9.5 1.9 1.7 0 1.1-.8 1.5-2 1.5Zm11.9-2.6c0-2.9-1.7-4.9-4.6-4.9-2.8 0-4.7 2-4.7 4.9 0 2.9 1.8 4.8 4.8 4.8 2.2 0 3.7-1 4.3-2.9h-2.2c-.3.7-1 1-1.9 1-1.3 0-2.1-.7-2.2-2h6.5v-.9Zm-6.6-1.4c.2-1.1 1-1.7 2-1.7s1.8.6 1.9 1.7h-3.9ZM14.6 5h5v1.4h-5V5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.5 8.8H3.6V20h2.9V8.8ZM5 7.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM20.4 13.9c0-3.2-1.7-4.9-4-4.9-1.6 0-2.6.9-3.1 1.7V8.8h-2.9V20h2.9v-5.8c0-1.5.7-2.5 2-2.5s1.9 1 1.9 2.6V20h3.2v-6.1Z" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.8 4h2.7l-6 6.8L21.6 20h-5.5l-4.3-5.6L6.9 20H4.2l6.4-7.3L3.4 4H9l3.9 5.1L17.8 4Zm-1 14.4h1.5L8.2 5.5H6.6l10.2 12.9Z" />
    </svg>
  );
}

export const SOCIAL_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  instagram: InstagramIcon,
  behance: BehanceIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};
