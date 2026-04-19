import { parentPort, workerData } from "node:worker_threads";
import { pathToFileURL } from "node:url";

type WorkerInput = {
  args: string[];
  cwd?: string;
  env?: Record<string, string>;
  cliEntry: string;
};

type WorkerOutput = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

const { args, cwd, env, cliEntry } = workerData as WorkerInput;

if (cwd) {
  process.chdir(cwd);
}
if (env) {
  for (const [k, v] of Object.entries(env)) {
    process.env[k] = v;
  }
}

let stdout = "";
let stderr = "";

const captureStream =
  (target: "out" | "err") =>
  (chunk: string | Uint8Array, encoding?: BufferEncoding | (() => void), callback?: () => void): boolean => {
    const text = typeof chunk === "string" ? chunk : Buffer.from(chunk).toString(typeof encoding === "string" ? encoding : "utf8");
    if (target === "out") stdout += text;
    else stderr += text;
    if (typeof encoding === "function") encoding();
    else if (typeof callback === "function") callback();
    return true;
  };

process.stdout.write = captureStream("out") as typeof process.stdout.write;
process.stderr.write = captureStream("err") as typeof process.stderr.write;

let exitCode = 0;
class CapturedExit extends Error {}
process.exit = ((code?: number) => {
  exitCode = code ?? 0;
  throw new CapturedExit();
}) as typeof process.exit;

process.argv = ["node", cliEntry, ...args];

try {
  const cli = await import(pathToFileURL(cliEntry).href);
  await cli.main(process.argv);
} catch (err) {
  if (!(err instanceof CapturedExit)) {
    stderr += err instanceof Error ? `${err.stack ?? err.message}\n` : `${String(err)}\n`;
    exitCode = 1;
  }
}

const result: WorkerOutput = { stdout, stderr, exitCode };
parentPort?.postMessage(result);
