import { memory } from "@blockless/sdk"

export default class Env {
    static STORAGE_ENDPOINT: string = ''
    static STORAGE_ACCESS_TOKEN: string = ''
    static RPC_NODE_ENDPOINT: string = ''
    static REPORT_TASK_ENDPOINT: string = ''

    static initalize(): void {
        const blsEnv = new memory.EnvVars().read()
        const blsEnvJson = blsEnv.toJSON()

        if (blsEnvJson.has('STORAGE_ENDPOINT')) {
            this.STORAGE_ENDPOINT = blsEnvJson.getString('STORAGE_ENDPOINT')!.toString()
        }

        if (blsEnvJson.has('STORAGE_ACCESS_TOKEN')) {
            this.STORAGE_ACCESS_TOKEN = blsEnvJson.getString('STORAGE_ACCESS_TOKEN')!.toString()
        }

        if (blsEnvJson.has('RPC_NODE_ENDPOINT')) {
            this.RPC_NODE_ENDPOINT = blsEnvJson.getString('RPC_NODE_ENDPOINT')!.toString()
        }

        if (blsEnvJson.has('REPORT_TASK_ENDPOINT')) {
            this.REPORT_TASK_ENDPOINT = blsEnvJson.getString('REPORT_TASK_ENDPOINT')!.toString()
        }
    }
}