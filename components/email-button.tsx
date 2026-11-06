import { EMAIL } from "@/content/site";

export function EmailButton() {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className="button-sm inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-accent px-3 py-2 text-accent-ink transition-[translate,scale,filter] duration-300 ease-curve hover:-translate-y-px hover:brightness-[1.12] active:scale-[.98]"
    >
      Email me about voice work
    </a>
  );
}
