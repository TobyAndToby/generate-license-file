import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { output as outputFileName } from "./config.js";

const execAsync = promisify(exec);

const licenseFixturePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "remote-license.md");

describe("cli", () => {
  let server: Server;
  let licenseServerOrigin = "";

  beforeAll(async () => {
    const licenseContent = await fs.readFile(licenseFixturePath, "utf8");

    server = createServer((request, response) => {
      if (request.url !== "/license.md") {
        response.writeHead(404).end();
        return;
      }

      response.writeHead(200, { "content-type": "text/markdown; charset=utf-8" }).end(licenseContent);
    });

    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));

    const { port } = server.address() as AddressInfo;
    licenseServerOrigin = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
  });

  it("should match snapshot when a package is replaced", async () => {
    const configPath = "./test/cli/replacement/config.js";

    await execAsync(`node ../../packages/generate-license-file/bin/generate-license-file -c ${configPath}`, {
      env: { ...process.env, GLF_E2E_LICENSE_SERVER_ORIGIN: licenseServerOrigin },
    });

    const result = await fs.readFile(outputFileName, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
