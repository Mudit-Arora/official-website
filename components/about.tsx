import Image from "next/image";
import { LINKS } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-label";

// Logos are public domain files from Wikimedia Commons (the UC Santa Cruz seal and the
// ASU monogram cropped from the university logo).
const education = [
  { degree: "MS in Artificial Intelligence", school: "UC Santa Cruz", logo: "/logos/ucsc.svg" },
  { degree: "BS in Computer Science", school: "Arizona State University", logo: "/logos/asu.svg" },
];

const link =
  "border-b border-dim transition-colors duration-300 ease-curve hover:border-accent hover:text-accent";

export function About() {
  return (
    <Reveal id="about" className="pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionHeading index="01">About</SectionHeading>
        <div className="max-w-[820px] space-y-6">
          <p className="heading-4">
            I&apos;m a member of technical staff at{" "}
            <a className={link} href={LINKS.synhawk}>
              Synhawk
            </a>
            , based in the Bay Area, where we build foundation models that detect deepfakes across audio, video and
            identity.
          </p>
          <p className="title-1 text-muted">
            Before that, I was an AI engineer at EzMedTech AI, a deep learning researcher at Uniphore, an AI software
            engineering intern at CRED, and a machine learning researcher at Mayo Clinic. My interests are natural
            language processing, large language models and generative AI. You&apos;ll find me working on projects,
            reading research papers, and talking to chatbots instead of real people.
          </p>
          <p className="title-1 text-muted">
            When I&apos;m not debugging, I&apos;m taking photos, hopping between cafes and restaurants, playing too many
            games, or rewatching sitcoms. I like hard problems and building things that work.
          </p>
        </div>
        <div className="mt-16 max-w-[820px]">
          <h3 className="heading-5 mb-4">
            <span className="bg-linear-to-r from-(--h1a) to-(--h1b) bg-clip-text text-transparent">Studied</span>
          </h3>
          {/* Same row style as the project list. */}
          <div className="grid">
            {education.map((e) => (
              <div
                key={e.degree}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-[auto_1fr] max-[900px]:gap-x-3 max-[900px]:gap-y-0.5"
              >
                {/* A white tile keeps the logos' own colours readable in both themes. */}
                <span className="relative size-10 shrink-0 rounded-lg border border-line bg-white max-[900px]:row-span-2">
                  <Image src={e.logo} alt="" fill unoptimized className="object-contain p-1" />
                </span>
                <span className="title-1 text-ink">{e.degree}</span>
                <span className="caption-5 text-muted max-[900px]:col-start-2">{e.school}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
