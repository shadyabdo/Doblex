import { useState } from "react";
import { RiWhatsappFill, RiFacebookFill, RiLinkedinFill, RiInstagramFill } from "react-icons/ri";
import { CloseIcon } from "./icons";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    icon: RiWhatsappFill,
    url: "https://wa.me/201234567890",
    color: "#25D366",
  },
  {
    name: "Facebook",
    icon: RiFacebookFill,
    url: "https://facebook.com/duplexstudio",
    color: "#1877F2",
  },
  {
    name: "LinkedIn",
    icon: RiLinkedinFill,
    url: "https://linkedin.com/company/duplexstudio",
    color: "#0A66C2",
  },
  {
    name: "Instagram",
    icon: RiInstagramFill,
    url: "https://instagram.com/duplexstudio",
    color: "#E4405F",
  },
];

export function FloatingSocialButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3">
      {/* أزرار السوشيال ميديا - تظهر فوق الزر */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {SOCIAL_LINKS.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              style={{
                background: social.color,
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                transform: isOpen ? "scale(1)" : "scale(0)",
              }}
              aria-label={social.name}
            >
              <Icon className="h-6 w-6 text-white" />
              {/* Tooltip */}
              <div className="pointer-events-none absolute start-full ms-3 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-paper opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {social.name}
                <div className="absolute end-full top-1/2 -translate-y-1/2 border-4 border-transparent border-e-ink"></div>
              </div>
            </a>
          );
        })}
      </div>

      {/* الزر الرئيسي */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-ink rotate-0" : "bg-teal"
        }`}
        aria-label={isOpen ? "Close social links" : "Open social links"}
      >
        {isOpen ? (
          <CloseIcon className="h-6 w-6 text-paper" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-paper"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        )}
      </button>
    </div>
  );
}
