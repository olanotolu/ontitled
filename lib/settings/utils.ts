import { createHash, randomBytes } from "node:crypto";

export function now() {
  return new Date().toISOString();
}

export function id(prefix: string) {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

export function slugify(input: string) {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return base || "workspace";
}

export function periodKey(d = new Date()) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function hashApiKey(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

export function generateApiKeySecret() {
  const raw = randomBytes(24).toString("base64url");
  const secret = `ot_live_${raw}`;
  const keyPrefix = secret.slice(0, 14);
  return { secret, keyPrefix, keyHash: hashApiKey(secret) };
}
