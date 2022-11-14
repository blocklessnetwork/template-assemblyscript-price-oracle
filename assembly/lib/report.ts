import Env from "../utils/env"
import { json } from "@blockless/sdk"
import { HttpClient, HttpClientOptions } from "../utils/http"
import RedisStorage from "../utils/redisStorage"

/**
 * Fetch average price for multiple sources, based on their recorded twap prices.
 * 
 * @returns 
 */
const fetchAveragePrice = (): f64 => {
  /**
   * Enter your source IDs here, these are the IDs that you have 
   * setup under your `aggregate` method.
   * 
   */
  const sources = ['sample_source_1'] // REPLACE 'sample_source_1' with your source ID

  /**
   * Standard mean price fetch logic
   * 
   * @TODO: Include VWAP secondary validation
   * @TODO: Include a deviation threshold check
   */
  let price = 0.0
  const prices = new json.JSON.Arr()
  const storageClient = new RedisStorage()

  for (let s = 0; s < sources.length; s++) {
    const source = sources[s]
    const sourceData = storageClient.get(source + '_twap')
    const sourceJson = <json.JSON.Obj>json.JSON.parse(sourceData)

    if (sourceJson.has('priceMean') && sourceJson.getFloat('priceMean')!._num > 0) {
      prices.push(sourceJson.getFloat('priceMean')!)
      price = price + sourceJson.getFloat('priceMean')!._num
    }
  }

  price = price / prices._arr.length

  return price
}

/**
 * Report the average price through a Gasless Relay Function.
 * 
 * @TODO: Include an example with interal MPC transaction.
 */
const reportAverage = (price: f64): void => {
  const httpClientHeaders = new Map<string, string>()
  const httpClientOptions = new HttpClientOptions(
    Env.REPORT_TASK_ENDPOINT,
    httpClientHeaders
    )

  const httpClient = new HttpClient(httpClientOptions)
  if (httpClient) {
    let body = new json.JSON.Obj()
    body.set('price', price)

    // Execute the gasless transaction, you may modify the payload here
    httpClient.post('/', body.toString())
  }
}

/**
 * Executes the fecth and report functions in sequence
 */
const runReport = (): void => {
  reportAverage(
    fetchAveragePrice()
  )

  process.stdout.write('success')
}

export default runReport