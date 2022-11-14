import "wasi"
import Env from "./utils/env"
import { Stdin, StdinCommand } from "./utils/stdin"

import runAggregate from "./lib/aggregate"
import runReport from "./lib/report"

/**
 * Execute the primary function for the Price Oracle
 * 
 * @output Function response in JSON
 */
function main(): void {
  // Load Environment
  Env.initalize()

  // Load Stdin
  Stdin.initalize()

  // Route Command Function
  switch (Stdin.COMMAND) {
    case StdinCommand.AGGREGATE:
      runAggregate()
      break

    case StdinCommand.REPORT:
      runReport()
      break
  }
}

main()