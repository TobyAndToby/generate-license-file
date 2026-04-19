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

const require = createRequire(import.meta.url);

const cliEntry = (() => {
  const mainEntry = require.resolve("generate-license-file");
  return resolve(dirname(mainEntry), "cli.mjs");
})();

const workerUrl = new URL("./cliWorker.ts", import.meta.url);

export const runCli = (args: string[], opts: RunCliOptions = {}): Promise<RunCliResult> => {
  return new Promise<RunCliResult>((resolvePromise, reject) => {
    const worker = new Worker(fileURLToPath(workerUrl), {
      workerData: {
        args,
        cwd: opts.cwd,
        env: opts.env,
        cliEntry,
      },
    });

    let settled = false;

    worker.once("message", (result: RunCliResult) => {
      settled = true;
      resolvePromise(result);
      worker.terminate();
    });

    worker.once("error", err => {
      settled = true;
      reject(err);
    });

    worker.once("exit", code => {
      if (!settled) {
        reject(new Error(`cliWorker exited without response (code ${code})`));
      }
    });
  });
};
