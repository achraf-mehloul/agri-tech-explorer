import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const items = [
  { label: "Home", href: "#top", icon: HomeIcon },
  { label: "Device", href: "#device", icon: PenIcon },
  { label: "Hardware", href: "#hardware", icon: ChipIcon },
  { label: "App", href: "#software", icon: PhoneIcon },
  { label: "Contact", href: "#contact", icon: MailIcon },
];

export function BottomNav() {
  const [active, setActive] = useState<string>("#top");

  useEffect(() => {
    const ids = items.map((i) => i.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(`#${id}`);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="glass-strong flex items-center gap-1 rounded-full p-1.5 shadow-2xl">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = active === href;
          return (
            <a
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span
                className={`hidden overflow-hidden transition-all sm:inline ${
                  isActive ? "max-w-[80px] opacity-100" : "max-w-0 opacity-0 sm:max-w-[80px] sm:opacity-100"
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
        <div className="mx-1 h-6 w-px bg-border/60" />
        <div className="pr-0.5">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

/* ---------- Icons ---------- */
type IconProps = { className?: string };
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function PenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M15 3l6 6-11 11H4v-6L15 3z" />
      <path d="M13 5l6 6" />
    </svg>
  );
}
function ChipIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}
function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}
function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
