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
      <span className={["relative block shrink-0", config.mark].join(" ")}>
        <Image
          src={BRAND.markSrc}
          alt={`${BRAND.name} logo`}
          fill
          sizes={size === "lg" ? "56px" : size === "md" ? "48px" : "40px"}
          priority={priority}
          className="object-contain"
        />
      </span>
      {showName ? (
        <span
          className={[
            "font-black tracking-[-0.01em] font-sans",
            config.label,
            labelClassName ?? "",
          ].join(" ")}
          style={{ 
            ...theme.labelStyle,
            letterSpacing: '-0.3px',
            lineHeight: '1.1'
          }}
        >
          <span className="text-[1.1em]">D</span>etectra
        </span>
      ) : null}
    </>
  );

  const rootClassName = [
    "inline-flex items-center no-underline",
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
