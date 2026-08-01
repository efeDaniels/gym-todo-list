type IconProps = {
  className?: string;
  size?: number;
};

const svgProps = (size: number, className: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function TodayIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 2 L12 6" />
      <path d="M12 22 L12 18" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.9 4.9 L7.8 7.8" />
      <path d="M16.2 16.2 L19.1 19.1" />
      <path d="M2 12 L6 12" />
      <path d="M18 12 L22 12" />
      <path d="M4.9 19.1 L7.8 16.2" />
      <path d="M16.2 7.8 L19.1 4.9" />
    </svg>
  );
}

export function DumbbellIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M2 10 L2 14" />
      <path d="M22 10 L22 14" />
      <rect x="4" y="7" width="3" height="10" rx="1" />
      <rect x="17" y="7" width="3" height="10" rx="1" />
      <path d="M7 12 L17 12" />
    </svg>
  );
}

export function AppleIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 6c-1.5-2-4-2.5-6-1-2 1.5-2 4.5-1 7 1 3 3 6 5 6s3-1 4-1 2 1 4 1c2.5 0 5-4 5-8 0-3-2-5-4-5-1.5 0-2.5.5-3 1.5" />
      <path d="M12 6 C12 4 13 3 14 2" />
    </svg>
  );
}

export function CheckIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg {...svgProps(size, className)} strokeWidth={3}>
      <path d="M5 12 L10 17 L19 7" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M15 6 L9 12 L15 18" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M9 6 L15 12 L9 18" />
    </svg>
  );
}

export function ResetIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4 L3 9 L8 9" />
    </svg>
  );
}

export function PlusIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 5 L12 19" />
      <path d="M5 12 L19 12" />
    </svg>
  );
}

export function MinusIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M5 12 L19 12" />
    </svg>
  );
}

export function DropletIcon({ className = "", size = 22 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 3 C12 3 5 10.5 5 15 a7 7 0 0 0 14 0 c0-4.5-7-12-7-12z" />
    </svg>
  );
}

export function MoonIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M21 12.8 A9 9 0 1 1 11.2 3 a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function InfoIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8 L12 8.01" />
      <path d="M12 11 L12 16" />
    </svg>
  );
}
