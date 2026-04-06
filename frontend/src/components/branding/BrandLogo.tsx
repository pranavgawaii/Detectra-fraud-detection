import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  showName?: boolean;
  className?: string;
  labelClassName?: string;
  priority?: boolean;
};

const sizeMap = {
  sm: {
    mark: "h-10 w-10",
    gap: "gap-3",
    label: "text-base",
  },
  md: {
    mark: "h-12 w-12",
    gap: "gap-3.5",
    label: "text-[1.05rem]",
  },
  lg: {
    mark: "h-14 w-14",
    gap: "gap-4",
    label: "text-[1.2rem]",
  },
} as const;

const toneStyles = {
  light: {
    labelStyle: { color: "var(--foreground)" },
  },
  dark: {
    labelStyle: { color: "#f8fafc" },
  },
} as const;

export default function BrandLogo({
  href,
  size = "md",
  tone = "light",
  showName = true,
  className,
  labelClassName,
  priority = false,
}: BrandLogoProps) {
  const config = sizeMap[size];
  const theme = toneStyles[tone];

  const content = (
    <>
      <div className={["relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl border transition-all duration-300", 
        config.mark,
        tone === "light" ? "bg-white/40 border-black/5" : "bg-white/5 border-white/10"
      ].join(" ")}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <div className="relative h-[70%] w-[70%]">
          <Image
            src={BRAND.markSrc}
            alt={`${BRAND.name} logo`}
            fill
            sizes={size === "lg" ? "40px" : size === "md" ? "32px" : "28px"}
            priority={priority}
            className="object-contain filter brightness-110"
          />
        </div>
        {/* Subtle inner glow for premium feel */}
        <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
      </div>

      {showName ? (
        <span
          className={[
            "font-bold tracking-[-0.03em] font-sans",
            config.label,
            labelClassName ?? "",
          ].join(" ")}
          style={{ 
            ...theme.labelStyle,
            lineHeight: '1',
            letterSpacing: '-0.04em'
          }}
        >
          {BRAND.name}
        </span>
      ) : null}
    </>
  );

  const rootClassName = [
    "inline-flex items-center no-underline active:scale-95 transition-transform",
    config.gap,
    className ?? "",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={rootClassName} aria-label={`${BRAND.name} home`}>
        {content}
      </Link>
    );
  }

  return <div className={rootClassName}>{content}</div>;
}
