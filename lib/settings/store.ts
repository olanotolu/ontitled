import { promises as fs } from "node:fs";
import path from "node:path";
import type { SettingsStoreData } from "./types";

const emptyStore = (): SettingsStoreData => ({
  profiles: {},
  workspaces: {},
  members: [],
  invites: [],
  apiKeys: [],
  usage: [],
  userWorkspace: {},
});

type GlobalBag = typeof globalThis & {
  __ontitledSettingsStore?: SettingsStoreData;
  __ontitledSettingsLock?: Promise<void>;
};

function storePath() {
  // Prefer durable project data dir; fall back to /tmp on read-only deploys.
  const preferred = path.join(process.cwd(), "data", "settings-store.json");
  if (process.env.VERCEL) {
    return path.join("/tmp", "ontitled-settings-store.json");
  }
  return preferred;
}

async function ensureDir(file: string) {
  await fs.mkdir(path.dirname(file), { recursive: true });
}

async function readFromDisk(): Promise<SettingsStoreData> {
  const file = storePath();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as SettingsStoreData;
    return {
      ...emptyStore(),
      ...parsed,
      profiles: parsed.profiles || {},
      workspaces: parsed.workspaces || {},
      members: parsed.members || [],
      invites: parsed.invites || [],
      apiKeys: parsed.apiKeys || [],
      usage: parsed.usage || [],
      userWorkspace: parsed.userWorkspace || {},
    };
  } catch {
    return emptyStore();
  }
}

async function writeToDisk(data: SettingsStoreData) {
  const file = storePath();
  await ensureDir(file);
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function withStore<T>(
  fn: (store: SettingsStoreData) => Promise<T> | T,
  opts: { mutate?: boolean } = {}
): Promise<T> {
  const g = globalThis as GlobalBag;
  const run = async () => {
    if (!g.__ontitledSettingsStore) {
      g.__ontitledSettingsStore = await readFromDisk();
    }
    const result = await fn(g.__ontitledSettingsStore);
    if (opts.mutate) {
      await writeToDisk(g.__ontitledSettingsStore);
    }
    return result;
  };

  const prev = g.__ontitledSettingsLock || Promise.resolve();
  let release!: () => void;
  g.__ontitledSettingsLock = new Promise<void>((r) => {
    release = r;
  });
  await prev;
  try {
    return await run();
  } finally {
    release();
  }
}
