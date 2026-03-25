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
```

## Inputs

| Name        | Required | Description                             |
| ----------- | -------- | --------------------------------------- |
| `tag`       | Yes      | The tag of the schema version to deploy |
| `stage`     | Yes      | The name of the stage                   |
| `api-id`    | Yes      | The ID of the API                       |
| `api-key`   | Yes      | API key for authentication              |
| `cloud-url` | No       | The URL of the Nitro registry           |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
