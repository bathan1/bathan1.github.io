import { Schema } from "effect";

const ProjectValue = Schema.Struct({
  description: Schema.String,
  languages: Schema.Array(Schema.String),
  image: Schema.Struct({
    src: Schema.String,
    alt: Schema.optional(Schema.String)
  }),
  href: Schema.String
});
type ProjectValue = typeof ProjectValue.Type;

export const projectAList: [string, ProjectValue][] = [
  ["Medfetch.js", {
    description: "A SQL on FHIR implementation with dedicated database runners!",
    languages: ["Javascript", "C", "SQLite", "PostgreSQL", "MySQL"],
    image: { src: "medfetchjs.png" },
    href: "https://medfetchjs.pages.dev/sql/sqlite"
  }],
  ["Personal Digital Spaces revamp", {
    description: "A cryptocurrency Testnet Faucet on NextJS.",
    languages: ["Javascript", "PostgreSQL", "Redis"],
    image: { src: "pds.png" },
    href: "https://pds-dase-portal-v2.fly.dev/"
  }],
  ["Presenter", {
    description: "A simple photo-gallery website built as a present for my mom and dad.",
    languages: ["Javascript", "HTML", "CSS"],
    image: { src: "presenter.png" },
    href: "https://bathan1.github.io/dad-and-jane/"
  }],
];
