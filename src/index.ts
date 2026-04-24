import * as core from "@actions/core";
import * as exec from "@actions/exec";
import {
  installNitro,
  getSourceMetadata,
} from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion: string = pkg.version;

async function executeCommand(): Promise<void> {
  try {
    const tag = core.getInput("tag", { required: true });
    const stage = core.getInput("stage", { required: true });
    const apiId = core.getInput("api-id", { required: true });
    const apiKey = core.getInput("api-key", { required: true });
    const jobId = core.getInput("job-id") || undefined;
    const sourceMetadata = getSourceMetadata(jobId);
    const force = core.getBooleanInput("force");
    const waitForApproval = core.getBooleanInput("wait-for-approval");
    const cloudUrl = core.getInput("cloud-url") || null;
    const legacyV1Archive = core.getInput("legacy-v1-archive") || null;

    const sourceSchemas = core.getMultilineInput("source-schemas", { required: true });

    const args: string[] = [
      "fusion",
      "publish",
      "--tag",
      tag,
      "--stage",
      stage,
      "--api-id",
      apiId,
      "--source-metadata",
      JSON.stringify(sourceMetadata),
    ];

    for (const sourceSchema of sourceSchemas) {
      args.push("--source-schema", sourceSchema);
    }

    if (legacyV1Archive) {
      args.push("--legacy-v1-archive", legacyV1Archive);
    }

    if (force) {
      args.push("--force");
    }

    if (waitForApproval) {
      args.push("--wait-for-approval");
    }

    if (cloudUrl) {
      args.push("--cloud-url", cloudUrl);
    }

    const env = {
      ...process.env,
      NITRO_API_KEY: apiKey,
    };

    const exitCode = await exec.exec("nitro", args, { env });

    if (exitCode !== 0) {
      core.setFailed(`Nitro CLI exited with code ${exitCode}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function run(): Promise<void> {
  await installNitro(nitroVersion);

  await executeCommand();
}

run();
