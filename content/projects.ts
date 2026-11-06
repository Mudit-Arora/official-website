export type Project = {
  name: string;
  line: string;
  // Award or venue, shown on the right.
  label: string;
  href: string;
  image: string;
  alt: string;
};

// Also on GitHub, not listed: ParkPal, Photo Share, Socially Unsocial.
export const projects: Project[] = [
  {
    name: "Blindspot",
    line: "describes the world to blind users, from an iPhone",
    label: "runner up, smallest.ai",
    href: "https://github.com/Mudit-Arora/Blindspot",
    image: "/img/blindspot.webp",
    alt: "Blindspot app on an iPhone",
  },
  {
    name: "SlugMeditate",
    line: "a thought, turned into a VR world",
    label: "winner, CruzHacks 2025",
    href: "https://slugmeditate.tech/",
    image: "/img/slugmeditate.webp",
    alt: "SlugMeditate landing page",
  },
  {
    name: "EduVoice AI",
    line: "talk to your lecture notes, in any language",
    label: "YC hackathon",
    href: "https://github.com/yooleee/Vibecon-Education-Platform",
    image: "/img/eduvoice.webp",
    alt: "EduVoice AI",
  },
  {
    name: "EduMUSE",
    line: "a multi agent tutor that talks you through your notes",
    label: "2025",
    href: "https://github.com/iamsorenl/EduMUSE",
    image: "/img/EduMUSE.webp",
    alt: "EduMUSE",
  },
  {
    name: "AmICooked.Chat",
    line: "a Chrome extension that grades your focus",
    label: "HackDavis 2025",
    href: "https://devpost.com/software/amicooked-chat",
    image: "/img/amicookedchat.webp",
    alt: "AmICooked.Chat",
  },
  {
    name: "Emotion detection",
    line: "LSTM and BiLSTM across languages",
    label: "SemEval 2025",
    href: "https://github.com/Mudit-Arora/semeval-task11",
    image: "/img/emotion-detection.webp",
    alt: "SemEval 2025 task 11",
  },
  {
    name: "Language modelling",
    line: "a decoder only transformer, from scratch",
    label: "PyTorch",
    href: "/NLP_243_Homework_3.pdf",
    image: "/img/language-model.webp",
    alt: "Language model illustration",
  },
  {
    name: "Brainrot Roast Bot",
    line: "roasts you, replies in GIFs",
    label: "Dumbathon",
    href: "https://github.com/Dumb-team-Dumbathon/current-build",
    image: "/img/brainrot.webp",
    alt: "Brainrot Roast Bot",
  },
  {
    name: "Mood Snap",
    line: "BeReal, for feelings",
    label: "CalHacks 10",
    href: "https://devpost.com/software/mood-app",
    image: "/img/moodsnap.webp",
    alt: "Mood Snap",
  },
];
