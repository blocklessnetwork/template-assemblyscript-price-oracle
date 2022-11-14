import path from "path"
import cron from "node-cron";
import { execSync as exec } from "child_process";

console.log('------------ Price Oracle ------------ ')
console.log('Starting ...')
console.log('')

/**
 * Execute aggregate function every 2 minutes 
 * and report function every 10 minutes
 * 
 */
let tick = 0
cron.schedule('*/2 * * * *', () => {
  try {
    tick++
    console.log(new Date().toISOString(), ': ', 'Running price aggregation ...')
    exec('./scripts/aggregate.sh', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' })
  } catch (error) { }

  if (tick >= 5) {
    tick = 0

    try {
      exec('./scripts/report.sh', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' })
    } catch (error) { }
  }
}).start()