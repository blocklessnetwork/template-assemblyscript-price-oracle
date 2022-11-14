import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-ethers"

require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      forking: {
        url: process.env.RPC_NODE_ENDPOINT as string
      }
    }
  }
}

export default config
