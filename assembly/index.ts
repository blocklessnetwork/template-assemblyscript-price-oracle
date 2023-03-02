import "wasi"
import { FeedBuilder, Sources, RedisStorage } from "@blockless/oracle-toolkit"
import { memory } from "@blockless/sdk"

const oracleFeed = new FeedBuilder("CUSD", "Coin98 Dollar")
  .setDescription("CUSD price feed for Efficiency DAO, powered by Blockless")

// Add Sources
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

// Set data aggreagation and provide data storage
oracleFeed.setAggregation(
  "twap",
  new RedisStorage(
    memory.EnvVars.get("STORAGE_ENDPOINT"),
    memory.EnvVars.get("STORAGE_ACCESS_TOKEN")
  )
)

// Serve
oracleFeed.serve()
