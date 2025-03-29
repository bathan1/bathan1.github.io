import { Schema } from "effect";

const ProjectValue = Schema.Struct({
  description: Schema.String,
  languages: Schema.Array(Schema.String),
  tools: Schema.Array(Schema.String),
  image: Schema.Struct({
    src: Schema.String,
    alt: Schema.optional(Schema.String)
  })
});
type ProjectValue = typeof ProjectValue.Type;

export const projectAList: [string, ProjectValue][] = [
  ["Medfetch (App)", {
    description: "A clinical data fetcher app built on top of native SQL! My biggest project yet, leading development across the entire stack.",
    languages: ["Typescript", "SQL", "HTML", "CSS"],
    tools: ["NextJS", "TailwindCSS", "React", "nodejs"],
    image: { src: "medfetch.png" }
  }],
  ["Medfetch (Library) + sqlite-on-wasm!", {
    description: "A SQL-on-FHIR implementation that is bundled with the Medfetch SQLite extension, which can be run on both the server or the browser via WebAssembly! All of these tools were written from scratch by yours truly.",
    languages: ["Typescript", "SQL"],
    tools: ["nodejs"],
    image: { src: "tql.png" }
  }],
  ["Escape the Game of Life", {
    description: "Conway's Game of Life 'gameified' into a Web App. Built purely with OCaml in the backend and ReScript in the frontend!",
    languages: ["OCaml", "ReScript"],
    tools: ["Dune", "React", "Vite"],
    image: { src: "escape.png" }
  }],
  ["Personal Digital Spaces revamp", {
    description: "A cryptocurrency Testnet Faucet on NextJS",
    languages: ["Typescript", "SQL"],
    tools: ["React", "Vite", "Redis", "NextJS", "nodejs"],
    image: { src: "pds.png" }
  }],
  ["Solution-Blitz", {
    description: "Competitive coding with ELO from the comfort of your very own VSCode editor!",
    languages: ["Typescript"],
    tools: ["nodejs", "VSCode API", "MongoDB", "Redis"],
    image: { src: "solblitz.png" }
  }],
  ["HopEats", {
    description: "A food-review Android app for Hopkins students!",
    languages: ["Typescript"],
    tools: ["nodejs", "VSCode API", "MongoDB"],
    image: { src: "hopeats.png" }
  }],
  ["Value Stacker", {
    description: "A remake of Redis's Stack built to deepen my understanding of memory management. Transactions with Rollbacks fully supported!",
    languages: ["C", "C++"],
    tools: ["GCC", "clang++"],
    image: { src: "valuestacker.png" }
  }],
  ["Presenter", {
    description: "A photo-gallery website made as a present for my mom and dad.",
    languages: ["Typescript", "HTML", "CSS"],
    tools: ["Vite"],
    image: { src: "presenter.png" }
  }],
];
