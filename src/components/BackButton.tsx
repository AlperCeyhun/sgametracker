import Link from "next/link";

type BackButtonProps = {
  href?: string;
  text?: string;
  className?: string;
};

export default function BackButton({
  href = "/",
  text = "← Back",
  className = "",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 ${className}`}
    >
      <span>←</span>
      <span>{text}</span>
    </Link>
  );
}