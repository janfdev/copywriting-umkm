import Image from "next/image";

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/logo-caption.svg"
      alt="Captionin logo"
      width={32}
      height={32}
      className={`rounded-full ${className}`}
      priority
    />
  );
}
