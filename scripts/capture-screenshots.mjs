/**
 * Local-only screenshot capture. Do not commit credentials.
 * Usage:
 *   $env:APS_EMAIL="..."; $env:APS_PASS="..."; $env:SURVEY_EMAIL="..."; $env:SURVEY_PASS="..."; node scripts/capture-screenshots.mjs
 */

import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/projects");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function captureAPS(page) {
  const email = requireEnv("APS_EMAIL");
  const password = requireEnv("APS_PASS");

  await page.goto("https://aps.we-matter.com/login", { waitUntil: "networkidle", timeout: 60000 });
  await page.screenshot({ path: path.join(OUT, "aps-login.png") });

  await page.locator('input[type="email"], input[name="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button:has-text("Sign in"), button[type="submit"]').first().click();
  await page.waitForTimeout(6000);

  await page.screenshot({ path: path.join(OUT, "aps-dashboard.png") });

  for (const route of ["/dashboard", "/goals", "/home"]) {
    try {
      await page.goto(`https://aps.we-matter.com${route}`, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(OUT, `aps-${route.slice(1)}.png`) });
    } catch {
      /* skip unavailable routes */
    }
  }
}

async function captureSurvey(page) {
  const email = requireEnv("SURVEY_EMAIL");
  const password = requireEnv("SURVEY_PASS");

  await page.goto("https://admin.we-matter.com/", { waitUntil: "networkidle", timeout: 60000 });
  await page.screenshot({ path: path.join(OUT, "self-survey-login.png") });

  await page.locator('input[type="email"], input[type="text"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button:has-text("Login"), button[type="submit"]').first().click();
  await page.waitForTimeout(7000);

  await page.screenshot({ path: path.join(OUT, "self-survey-dashboard.png") });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })).newPage();

  try {
    console.log("APS...");
    await captureAPS(page);
  } catch (e) {
    console.error("APS:", e.message);
  }

  try {
    console.log("Self Survey...");
    await captureSurvey(page);
  } catch (e) {
    console.error("Survey:", e.message);
  }

  await browser.close();
  console.log("Saved to public/projects/");
}

main();
