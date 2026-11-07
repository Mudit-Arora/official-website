// Projects, in order. Content comes from the old site (legacy/react-site), lightly edited
// to the copy rules (plain words, no hyphens). The first link is where the row goes.
export type LinkKind = "github" | "site" | "devpost" | "demo" | "report";

export type Project = {
  name: string;
  line: string;
  // Award or venue, shown on the right. Empty when there is none.
  label: string;
  description: string;
  tech: string[];
  links: { kind: LinkKind; href: string }[];
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    name: "Blindspot",
    line: "describes the world to blind users, from an iPhone",
    label: "runner up, smallest.ai",
    description:
      "An iOS app for blind and low vision users. On device computer vision reads the surroundings, and a voice agent describes what is happening and helps them get around safely.",
    tech: ["Swift", "SwiftUI", "CoreML", "VisionKit", "FastAPI", "Smallest.ai", "Groq"],
    links: [
      { kind: "github", href: "https://github.com/Mudit-Arora/Blindspot" },
      { kind: "demo", href: "https://drive.google.com/file/d/1WxWD7MsBLvR-CUFj1B1CwV7Y2t5Os4h_/view" },
    ],
    image: "/img/blindspot.webp",
    alt: "Blindspot app on an iPhone",
  },
  {
    name: "SlugMeditate",
    line: "a thought, turned into a VR world",
    label: "winner, CruzHacks 2025",
    description:
      "A pipeline that turns a thought into a 3D ambient escape: text becomes images, video, music, a 3D scene and finally VR.",
    tech: ["Python", "Gemini API", "Niantic Studio", "Next.js"],
    links: [
      { kind: "site", href: "https://slugmeditate.tech/" },
      { kind: "devpost", href: "https://devpost.com/software/slugmeditate" },
    ],
    image: "/img/slugmeditate.webp",
    alt: "SlugMeditate landing page",
  },
  {
    name: "EduVoice AI",
    line: "talk to your lecture notes, in any language",
    label: "YC hackathon",
    description:
      "A full stack voice platform where students talk to their uploaded lectures in many languages, with quizzes and summaries made for them.",
    tech: ["Emergent", "Cartesia", "Deepgram", "LiveKit", "Silero VAD", "React", "Tailwind", "OpenAI API"],
    links: [{ kind: "github", href: "https://github.com/yooleee/Vibecon-Education-Platform" }],
    image: "/img/eduvoice.webp",
    alt: "EduVoice AI",
  },
  {
    name: "EduMUSE",
    line: "a multi agent tutor that talks you through your notes",
    label: "",
    description:
      "An AI tutor that turns study material into personal lessons, built from agents for reading documents, finding knowledge and tutoring.",
    tech: ["CrewAI", "SerperDev", "ElevenLabs", "React", "Material UI", "OpenAI API"],
    links: [{ kind: "github", href: "https://github.com/iamsorenl/EduMUSE" }],
    image: "/img/EduMUSE.webp",
    alt: "EduMUSE",
  },
  {
    name: "AmICooked.Chat",
    line: "a Chrome extension that grades your focus",
    label: "HackDavis 2025",
    description:
      "A Chrome extension that quietly tracks tab and app switches, groups them into sessions and uses LLMs to sum up how focused you were.",
    tech: ["Python", "Gemini API", "FastAPI", "React", "Tailwind"],
    links: [{ kind: "devpost", href: "https://devpost.com/software/amicooked-chat" }],
    image: "/img/amicookedchat.webp",
    alt: "AmICooked.Chat",
  },
  {
    name: "Emotion detection",
    line: "LSTM and BiLSTM across languages",
    label: "SemEval 2025",
    description:
      "LSTM and BiLSTM models for emotion detection within one language and across many, with competitive results at SemEval 2025.",
    tech: ["PyTorch", "NLP", "LSTM", "BiLSTM"],
    links: [
      { kind: "github", href: "https://github.com/Mudit-Arora/semeval-task11" },
      { kind: "report", href: "/NLP243ProjectReport.pdf" },
    ],
    image: "/img/emotion-detection.webp",
    alt: "SemEval 2025 task 11",
  },
  {
    name: "Language modelling",
    line: "a decoder only transformer, from scratch",
    label: "",
    description: "A decoder only transformer built from scratch in PyTorch for next word prediction.",
    tech: ["PyTorch", "Transformers", "NLP"],
    links: [{ kind: "report", href: "/NLP_243_Homework_3.pdf" }],
    image: "/img/language-model.webp",
    alt: "Language model illustration",
  },
  {
    name: "Brainrot Roast Bot",
    line: "roasts you, replies in GIFs",
    label: "Dumbathon",
    description:
      "A chatbot that roasts you with maximum brainrot energy and answers in GIFs: sigma males, skibidi toilet, gigachads and the rest of peak internet.",
    tech: ["OpenAI API", "Cartesia", "Giphy API", "React"],
    links: [
      { kind: "github", href: "https://github.com/Dumb-team-Dumbathon/current-build" },
      { kind: "demo", href: "https://drive.google.com/file/d/1nDsUMpy39ZZ10GNw3nSqksPhJbcH0o8l/view" },
    ],
    image: "/img/brainrot.webp",
    alt: "Brainrot Roast Bot",
  },
  {
    name: "Mood Snap",
    line: "BeReal, for feelings",
    label: "CalHacks 10",
    description:
      "A BeReal style journal that asks for a daily emotional check in, so you can track your moods and share them honestly.",
    tech: ["Reflex", "Flutter", "Convex", "JavaScript"],
    links: [
      { kind: "devpost", href: "https://devpost.com/software/mood-app" },
      { kind: "github", href: "https://github.com/jauntybrain/mood-app" },
    ],
    image: "/img/moodsnap.webp",
    alt: "Mood Snap",
  },
  {
    name: "ParkPal",
    line: "finds parking near you, on iOS",
    label: "",
    description: "An iOS app that finds parking nearby with directions, and saves your favorite spots with CoreData.",
    tech: ["Swift", "SwiftUI", "CoreData"],
    links: [
      { kind: "github", href: "https://github.com/Mudit-Arora/ParkPal" },
      { kind: "demo", href: "https://youtu.be/KRMCgYt3N_I" },
    ],
    image: "/img/parkpal.webp",
    alt: "ParkPal app",
  },
  {
    name: "Photo Share",
    line: "an Instagram style photo app for the web",
    label: "",
    description: "An Instagram inspired web app with sign in, photo sharing, likes and comments.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "SQL"],
    links: [
      { kind: "github", href: "https://github.com/Mudit-Arora/Photo-Share-" },
      { kind: "demo", href: "https://youtu.be/JONdeJ6hhk0" },
    ],
    image: "/img/photo-share.webp",
    alt: "Photo Share app",
  },
  {
    name: "Socially Unsocial",
    line: "a social app with posts, comments and filters",
    label: "",
    description: "A full stack social media app with photo and video posts, live comments and content filtering.",
    tech: ["React", "Tailwind", "Supabase"],
    links: [{ kind: "demo", href: "https://www.loom.com/share/bcc65c60c381479d9f416a20986ea431" }],
    image: "/img/socially-unsocial.webp",
    alt: "Socially Unsocial app",
  },
];
