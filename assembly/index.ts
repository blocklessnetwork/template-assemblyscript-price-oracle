import "wasi"
import { FeedBuilder, Sources, RedisStorage } from "@blockless/oracle-toolkit"
import { memory } from "@blockless/sdk"

/**
 * Create a new feed with a given Symbol, Name and Description
 */
const oracleFeed = new FeedBuilder("CUSD", "Coin98 Dollar")
  .setDescription("CUSD price feed for Efficiency DAO, powered by Blockless")

/**
 * Add one or may sources below using the `oracleFeed.addSrouce()` method
 */
oracleFeed.addSource(
  new Sources.BaryonExchangeBSC(
    "{{CONTRACT_ID}}",
    new Sources.PairToken(
      0,
      "BUSD",
      "{{BUSD_CONTRACT_ID}}"
    ),
    new Sources.PairToken(
      1,
      "CUSD",
      "{{CUSD_CONTRACT_ID}}"
    )
  )
)

/**
 * Set data aggreagation and provide data storage
 * 
 * NOTE: Uncomment this section to enable aggregation
 */
// oracleFeed.setAggregation(
//   "twap",
//   new RedisStorage(
//     memory.EnvVars.get("STORAGE_ENDPOINT"),
//     memory.EnvVars.get("STORAGE_ACCESS_TOKEN")
//   )
// )

/**
 * Serve the oracle feed
 */
oracleFeed.serve()
