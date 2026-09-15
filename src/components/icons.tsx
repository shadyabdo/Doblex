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

export function GitHubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10Z" />
    </svg>
  );
}

export function FigmaIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M15.857 8.959c-1.574 0-2.851 1.277-2.851 2.851s1.277 2.851 2.851 2.851 2.851-1.277 2.851-2.851-1.277-2.851-2.851-2.851Zm0 4.702a1.854 1.854 0 0 1-1.851-1.851 1.854 1.854 0 0 1 1.851-1.851 1.854 1.854 0 0 1 1.851 1.851 1.854 1.854 0 0 1-1.851 1.851ZM8.143 17.516c1.574 0 2.851-1.277 2.851-2.851v-2.851H8.143c-1.574 0-2.851 1.277-2.851 2.851s1.277 2.851 2.851 2.851Zm0-4.702h1.851v1.851a1.854 1.854 0 0 1-1.851 1.851 1.854 1.854 0 0 1-1.851-1.851 1.854 1.854 0 0 1 1.851-1.851ZM8.143 11.81h2.851V6.107H8.143c-1.574 0-2.851 1.277-2.851 2.851s1.277 2.851 2.851 2.851Zm0-4.702h1.851v3.702H8.143a1.854 1.854 0 0 1-1.851-1.851 1.854 1.854 0 0 1 1.851-1.851ZM15.857 6.107h-2.851v2.851h2.851c.76 0 1.456-.298 1.975-.783.52-.485.876-1.155.876-2.068 0-1.574-1.277-2.851-2.851-2.851s-2.851 1.277-2.851 2.851v2.851h2.851V6.107Zm-1.851-.951c0-1.022.829-1.851 1.851-1.851s1.851.829 1.851 1.851-.829 1.851-1.851 1.851h-1.851V5.156ZM13.006 17.516c1.574 0 2.851-1.277 2.851-2.851v-2.851h-2.851c-1.574 0-2.851 1.277-2.851 2.851s1.277 2.851 2.851 2.851Zm0-4.702h1.851v1.851a1.854 1.854 0 0 1-1.851 1.851 1.854 1.854 0 0 1-1.851-1.851 1.854 1.854 0 0 1 1.851-1.851Z" />
    </svg>
  );
}

export function DribbbleIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.052-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.443a25.424 25.424 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362ZM12 3.475c2.17 0 4.154.813 5.662 2.148-.15.215-1.443 1.969-4.7 3.215l-1.03-1.9c-.158-.298-.324-.6-.501-.904A8.542 8.542 0 0 1 12 3.475Zm-2.65 1.081c.17.297.335.6.494.897l1.026 1.893c-3.312.948-6.188.92-6.46.914A8.522 8.522 0 0 1 9.35 4.556ZM3.475 12c0-.127.003-.254.008-.38.26.006 3.55.04 7.12-.968.2.378.388.764.563 1.155l-.24.074c-3.69 1.19-5.646 4.472-5.84 4.8A8.466 8.466 0 0 1 3.475 12Zm8.525 8.525a8.482 8.482 0 0 1-5.238-1.8c.152-.315 1.783-3.444 5.83-4.86.02-.006.04-.013.06-.02.98 2.54 1.38 4.68 1.484 5.29A8.454 8.454 0 0 1 12 20.525Zm4.088-.804c-.07-.417-.44-2.474-1.36-4.98 2.66-.425 4.99.268 5.27.356a8.514 8.514 0 0 1-3.91 4.624Z" />
    </svg>
  );
}

export function CodepenIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" y1="22" x2="12" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line x1="12" y1="2" x2="12" y2="8.5" />
    </svg>
  );
}

export function VercelIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 22.525H0l12-21 12 21z" />
    </svg>
  );
}

export function NetlifyIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.62 11.13h.01v.01l-.01-.01Zm-.01 0h-.01v.01l.01-.01ZM11.33 6.17h-.01v.01l.01-.01Zm-.01 0h-.01v.01l.01-.01Zm5.3 4.96h-.01v.01l.01-.01Zm-.01 0h-.01v.01l.01-.01Zm-5.3 4.96h-.01v.01l.01-.01Zm-.01 0h-.01v.01l.01-.01Zm5.3-4.96h-.01v.01l.01-.01Zm-.01 0h-.01v.01l.01-.01ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.62 14.62c-.16.16-.38.25-.61.25h-8.02c-.23 0-.45-.09-.61-.25l-1.25-1.25c-.16-.16-.25-.38-.25-.61V7.24c0-.23.09-.45.25-.61l1.25-1.25c.16-.16.38-.25.61-.25h8.02c.23 0 .45.09.61.25l1.25 1.25c.16.16.25.38.25.61v8.52c0 .23-.09.45-.25.61l-1.25 1.25Z" />
    </svg>
  );
}

export function LinkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

/**
 * يحلل الرابط ويرجع الأيقونة المناسبة
 */
export function detectUrlIcon(url: string): (p: IconProps) => ReactElement {
  const lower = url.toLowerCase();
  
  if (lower.includes('github.com') || lower.includes('github.io')) return GitHubIcon;
  if (lower.includes('figma.com') || lower.includes('figma.design')) return FigmaIcon;
  if (lower.includes('behance.net') || lower.includes('behance.com')) return BehanceIcon;
  if (lower.includes('dribbble.com')) return DribbbleIcon;
  if (lower.includes('codepen.io')) return CodepenIcon;
  if (lower.includes('vercel.app') || lower.includes('vercel.com')) return VercelIcon;
  if (lower.includes('netlify.app') || lower.includes('netlify.com')) return NetlifyIcon;
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return PlayIcon;
  if (lower.includes('vimeo.com')) return PlayIcon;
  
  // الافتراضي: أيقونة رابط عامة
  return LinkIcon;
}

export const SOCIAL_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  instagram: InstagramIcon,
  behance: BehanceIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};
