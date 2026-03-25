import * as core from "@actions/core";
import * as exec from "@actions/exec";
import {
  installNitro,
  getSourceMetadata,
} from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion = pkg.version;

async function executeCommand() {
  try {
    const tag = core.getInput("tag", { required: true });
    const stage = core.getInput("stage", { required: true });
    const apiId = core.getInput("api-id", { required: true });
    const apiKey = core.getInput("api-key", { required: true });
    const cloudUrl = core.getInput("cloud-url") || null;

    const args = [
      "fusion",
      "publish",
      "--tag",
      tag,
      "--stage",
      stage,
      "--api-id",
      apiId,
    ];

    if (cloudUrl) {
      args.push("--cloud-url", cloudUrl);
    }

    const env = {
      ...process.env,
      NITRO_API_KEY: apiKey,
    };

    const options = { env };

    const exitCode = await exec.exec("nitro", args, options);

    if (exitCode !== 0) {
      core.setFailed(`Nitro CLI exited with code ${exitCode}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function run() {
  await installNitro(nitroVersion);

  const sourceMetadata = await getSourceMetadata();

  await executeCommand(sourceMetadata);
}

run();
