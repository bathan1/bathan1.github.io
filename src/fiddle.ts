import { Effect } from "effect";
import { medfetch } from "medfetch/sqlite-wasm";

let db: Awaited<ReturnType<typeof medfetch>>;

const output = document.getElementById("output")!;
const input = document.getElementById("sql-input")! as HTMLTextAreaElement;
const runButton = document.getElementById("run-query")!;

async function setup() {
  db = medfetch("https://r4.smarthealthit.org");
  runButton.addEventListener("click", runQuery);
}

async function runQuery() {
  const queryText = input.value;

  output.innerHTML = `<p style="color: #aaa;">Loading... JOINs are slow right now, but this will resolve, I PROMISE</p>`;

  try {
    const result = await db`${queryText}`.pipe(Effect.runPromise);
    output.innerHTML = renderTable(result);
  } catch (err) {
    output.innerHTML = `<pre style="color: red;">${(err as Error).message}</pre>`;
  }
}


setup();

function renderTable(rows: any[]): string {
  if (rows.length === 0) return "<p>No results found.</p>";

  const headers = Object.keys(rows[0]);
  const headerRow = headers.map(h => `<th>${h}</th>`).join("");

  const bodyRows = rows.map(row =>
    `<tr>${headers.map(h => `<td>${row[h]}</td>`).join("")}</tr>`
  ).join("\n");

  return `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead><tr>${headerRow}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;
}

