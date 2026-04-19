import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

export type RunCliOptions = {
  cwd?: string;
  env?: Record<string, string>;
};

export type RunCliResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

type WorkerResponse = {
  id: number;
  stdout: string;
  stderr: string;
  exitCode: number;
};

const require = createRequire(import.meta.url);

const cliEntry = (() => {
  const mainEntry = require.resolve("generate-license-file");
  return resolve(dirname(mainEntry), "cli.mjs");
})();

const workerUrl = new URL("./cliWorker.ts", import.meta.url);

let workerInstance: Worker | null = null;
let nextId = 0;
const pending = new Map<number, (r: RunCliResult) => void>();
let readyPromise: Promise<void> | null = null;

const getWorker = (): Worker => {
  if (workerInstance) return workerInstance;

  workerInstance = new Worker(fileURLToPath(workerUrl), {
    workerData: { cliEntry },
  });

  readyPromise = new Promise<void>(resolveReady => {
    const onFirstMessage = () => {
      resolveReady();
    };
    workerInstance?.once("message", onFirstMessage);
  });

  workerInstance.on("message", (msg: WorkerResponse) => {
    if (msg.id === -1) return; // ready signal
    const cb = pending.get(msg.id);
    if (cb) {
      pending.delete(msg.id);
      cb({ stdout: msg.stdout, stderr: msg.stderr, exitCode: msg.exitCode });
    }
  });

  workerInstance.on("error", err => {
    for (const cb of pending.values()) {
      cb({ stdout: "", stderr: `cliWorker error: ${err.message}`, exitCode: 1 });
    }
    pending.clear();
  });

  return workerInstance;
};

export const closeCliWorker = async (): Promise<void> => {
  if (!workerInstance) return;
  await workerInstance.terminate();
  workerInstance = null;
  readyPromise = null;
  pending.clear();
};

export const runCli = async (args: string[], opts: RunCliOptions = {}): Promise<RunCliResult> => {
  const worker = getWorker();
  if (readyPromise) await readyPromise;

  const id = nextId++;
  return new Promise<RunCliResult>(resolvePromise => {
    pending.set(id, resolvePromise);
    worker.postMessage({ id, args, cwd: opts.cwd, env: opts.env });
  });
};
