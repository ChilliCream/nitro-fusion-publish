# Nitro Fusion Publish

A GitHub Action that publishes GraphQL source schemas to the Nitro registry.

## Usage

```yaml
- uses: ChilliCream/nitro-fusion-publish@v16
  with:
    tag: <tag>
    stage: <stage>
    api-id: <api-id>
    api-key: <api-key>
    source-schemas:
      - products # This will look for products@<tag>
      - reviews@2.0.0
    # Optional
    force: true
    wait-for-approval: true
    cloud-url: <cloud-url>
```

## Inputs

| Name                 | Required | Description                                                                                                         |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `tag`                | Yes      | The tag of the source schema version                                                                                |
| `stage`              | Yes      | The name of the stage                                                                                               |
| `api-id`             | Yes      | The ID of the API                                                                                                   |
| `api-key`            | Yes      | API key for authentication                                                                                          |
| `source-schemas`     | Yes      | Source schemas to include (e.g. `example` or `example@1.0.0`). If no version is specified, the `tag` value is used. |
| `force`              | No       | Continue publishing even if breaking changes or validation errors are detected.                                      |
| `wait-for-approval`  | No       | Require approval in the Nitro UI to continue publishing when breaking changes or validation errors are detected.     |
| `cloud-url`          | No       | The URL of the Nitro registry                                                                                       |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
