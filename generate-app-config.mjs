import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const envPath = path.join(rootDir, ".env");
const outputPath = path.join(rootDir, "app-config.js");

function parseEnv(content) {
  const result = {};
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

if (!fs.existsSync(envPath)) {
  console.error("Файл .env не найден. Создай его на основе .env.example");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const env = parseEnv(envContent);
const siteKey = env.RECAPTCHA_SITE_KEY || "";

if (!siteKey) {
  console.error("В .env отсутствует RECAPTCHA_SITE_KEY");
  process.exit(1);
}

const output = `window.APP_CONFIG = window.APP_CONFIG || {
  RECAPTCHA_SITE_KEY: ${JSON.stringify(siteKey)},
};
`;

fs.writeFileSync(outputPath, output, "utf8");
console.log("app-config.js успешно обновлен.");
