import { existsSync, readFileSync, writeFileSync } from "node:fs";

const envPath = ".env.production";
const keys = ["RESEND_API_KEY"];
const available = keys.filter((key) => process.env[key]);

if (!available.length) {
  process.exit(0);
}

const existing = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
let lines = existing.split(/\r?\n/).filter(Boolean);

for (const key of available) {
  lines = lines.filter((line) => !line.startsWith(`${key}=`));
  lines.push(`${key}=${JSON.stringify(process.env[key])}`);
}

writeFileSync(envPath, `${lines.join("\n")}\n`, "utf8");
