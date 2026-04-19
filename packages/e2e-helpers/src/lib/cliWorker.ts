import { parentPort, workerData } from "node:worker_threads";
import { pathToFileURL } from "node:url";

type Request = {
  id: number;
  args: string[];
  cwd?: string;
  env?: Record<string, string>;
};

type Response = {
  id: number;
  stdout: string;
  stderr: string;
  exitCode: number;
};

class CapturedExit extends Error {}

const { cliEntry } = workerData as { cliEntry: string };
const cli = await import(pathToFileURL(cliEntry).href);

const origStdoutWrite = process.stdout.write.bind(process.stdout);
const origStderrWrite = process.stderr.write.bind(process.stderr);
const origExit = process.exit;
const origCwd = process.cwd();

const capturedRef = { stdout: "", stderr: "", exitCode: 0 };

process.stdout.write = ((chunk: string | Uint8Array, encoding?: BufferEncoding | (() => void), callback?: () => void) => {
  capturedRef.stdout += typeof chunk === "string" ? chunk : Buffer.from(chunk).toString(typeof encoding === "string" ? encoding : "utf8");
  if (typeof encoding === "function") encoding();
  else if (typeof callback === "function") callback();
  return true;
}) as typeof process.stdout.write;

process.stderr.write = ((chunk: string | Uint8Array, encoding?: BufferEncoding | (() => void), callback?: () => void) => {
  capturedRef.stderr += typeof chunk === "string" ? chunk : Buffer.from(chunk).toString(typeof encoding === "string" ? encoding : "utf8");
  if (typeof encoding === "function") encoding();
  else if (typeof callback === "function") callback();
  return true;
}) as typeof process.stderr.write;

process.exit = ((code?: number) => {
  capturedRef.exitCode = code ?? 0;
  throw new CapturedExit();
}) as typeof process.exit;

let queue: Promise<void> = Promise.resolve();

const runOne = async (req: Request): Promise<Response> => {
  capturedRef.stdout = "";
  capturedRef.stderr = "";
  capturedRef.exitCode = 0;

  const originalEnv = { ...process.env };
  if (req.env) {
    for (const [k, v] of Object.entries(req.env)) process.env[k] = v;
  }
  if (req.cwd) process.chdir(req.cwd);

  try {
    process.argv = ["node", cliEntry, ...req.args];
    await cli.main(process.argv);
  } catch (err) {
    if (!(err instanceof CapturedExit)) {
      capturedRef.stderr += err instanceof Error ? `${err.stack ?? err.message}\n` : `${String(err)}\n`;
      capturedRef.exitCode = 1;
    }
  } finally {
    if (req.cwd) process.chdir(origCwd);
    if (req.env) {
      for (const k of Object.keys(req.env)) delete process.env[k];
      for (const [k, v] of Object.entries(originalEnv)) process.env[k] = v;
    }
  }

  return {
    id: req.id,
    stdout: capturedRef.stdout,
    stderr: capturedRef.stderr,
    exitCode: capturedRef.exitCode,
  };
};

const debug = (msg: string): void => {
  origStderrWrite(`[cliWorker] ${msg}\n`);
};

parentPort?.on("message", (req: Request) => {
  queue = queue.then(
    async () => {
      try {
        const res = await runOne(req);
        parentPort?.postMessage(res);
      } catch (err) {
        debug(`runOne threw for id=${req.id}: ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
        parentPort?.postMessage({
          id: req.id,
          stdout: "",
          stderr: err instanceof Error ? `${err.stack ?? err.message}\n` : `${String(err)}\n`,
          exitCode: 1,
        });
      }
    },
    err => {
      debug(`queue rejected before id=${req.id} arrived: ${err}`);
    },
  );
});

// Ready signal to unblock the first runCli call on the parent side.
parentPort?.postMessage({ id: -1, stdout: "", stderr: "", exitCode: 0 });

void origExit;
