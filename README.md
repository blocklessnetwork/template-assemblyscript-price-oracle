Blockless Price Oracle Example
===

This is a sample price oracle starter template.

## Development

**Install dependencies**

`npm install`

**Prepare Environment Variables**

Copy `.env.example` to `.env`

See mandatory environment variables.


**Build and Execute**

Install the bls CLI and execute `run.sh`.

You may also run the following command:

```
bls function invoke aggregate \
  --env STORAGE_ENDPOINT={{ENTER_YOUR_UPSTASH_ENDPOINT}} \
  --env STORAGE_ACCESS_TOKEN={{ENTER_YOUR_UPSTASH_ACCESS_TOKEN}} \
```

## Configuration

Use bls.toml to modify blockless function configuration.

**Permissions**

To access an external resource through the Http Client, include the resource base url under [deployment.permissions].

**Triggers**

To trigger the function using a cronjob, update the cron defination under [triggers.crons].

**Mandatory Environment Variables:**

| KEY                   | DESCRIPTION                           |
|-----------------------|---------------------------------------|
| STORAGE_ENDPOINT      | Redis HTTP access endpoint  |
| STORAGE_ACCESS_TOKEN  | Redis HTTP access token     |


## Deploy

Login to your bls console and execute the following command.

```
bls function deploy
```
