import { memory } from "@blockless/sdk"

export enum StdinCommand {
    AGGREGATE = 1,
    REPORT = 2,
    NONE = 999
}

export class Stdin {
    static COMMAND: StdinCommand = StdinCommand.NONE
    static COMMAND_STRING: string = ''
    static SUB_COMMANDS: string[] = []

    static initalize(): void {
        const blsStdin = new memory.Stdin().read()
        const blsStdinString = blsStdin.toString()
        const allCommands = blsStdinString.split(' ')

        if (allCommands.length > 1) {
            this.COMMAND_STRING = allCommands[0]

            this.SUB_COMMANDS = allCommands
            this.SUB_COMMANDS.shift()
        } else if (allCommands.length === 1) {
            this.COMMAND_STRING = allCommands[0]
        }

        if (this.COMMAND_STRING && this.COMMAND_STRING.startsWith('aggregate')) {
            this.COMMAND = StdinCommand.AGGREGATE
        } else if (this.COMMAND_STRING && this.COMMAND_STRING.startsWith('report')) {
            this.COMMAND = StdinCommand.REPORT
        }
    }
}