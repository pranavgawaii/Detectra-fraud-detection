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
    mark: "h-6 w-auto",
    gap: "gap-1.5",
    label: "text-sm",
  },
  md: {
    mark: "h-7 w-auto",
    gap: "gap-2",
    label: "text-[0.95rem]",
  },
  lg: {
    mark: "h-9 w-auto",
    gap: "gap-2.5",
    label: "text-[1.1rem]",
  },
} as const;

const toneStyles = {
  light: {
    labelStyle: { color: "#FFFFFF" },
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
      <span className="relative flex shrink-0 items-center justify-center">
        <Image
          src={BRAND.markSrc}
          alt={`${BRAND.name} logo`}
          width={size === "lg" ? 48 : size === "md" ? 32 : 28}
          height={size === "lg" ? 36 : size === "md" ? 24 : 20}
          priority={priority}
          className="object-contain"
        />
      </span>
      {showName && (
        <span 
          className={["font-bold tracking-tight", config.label, labelClassName].join(" ")}
          style={theme.labelStyle}
        >
          {BRAND.name}
        </span>
      )}
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
