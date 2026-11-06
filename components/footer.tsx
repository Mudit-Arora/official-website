// Same sign-off as the old site.
export function Footer() {
  return (
    <footer className="caption-5 flex items-center justify-center gap-1.5 pb-12 text-dim">
      Made with
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-4 animate-pulse text-[#ef4444] motion-reduce:animate-none"
        role="img"
        aria-label="love"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        />
      </svg>
      by Mudit Arora
    </footer>
  );
}
