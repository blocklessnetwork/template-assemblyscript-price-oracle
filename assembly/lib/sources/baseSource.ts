import { json } from "@blockless/sdk"

import RedisStorage from "../../utils/redisStorage"
import SpotPriceData from "../common/spotPriceData"
import TwapData from "../common/twapData"

export default abstract class BaseSource {
  protected id: string
  protected description: string
  protected storageClient: RedisStorage

  constructor(id: string, description: string) {
    this.id = id
    this.description = description
    this.storageClient = new RedisStorage()
  }
  
  /**
   * Abstract spot price retrival function.
   * 
   * @returns the spot price data object
   */
  abstract fetchSpotPrice(): SpotPriceData

  /**
   * Fetches the mean price from twap data storage
   * 
   * @returns the mean price of the data source
   */
  fetchPrice(): f64 {
    let value: f64 = 0.0

    const storageClient = new RedisStorage()
    const sourceData = storageClient.get(this.getStorageIdentifier())
    const sourceJson = <json.JSON.Obj>json.JSON.parse(sourceData)

    if (sourceJson.has('priceMean') && sourceJson.getFloat('priceMean')!._num > 0) {
      value = sourceJson.getFloat('priceMean')!._num
    }

    return <f64>value
  }

  /**
   * Get unique identifier
   * 
   * @returns the unique storage identifier as a string 
   */
  getStorageIdentifier(): string {
    return this.id + '_twap'
  }

  /**
   * Fetch twap data from the database
   * 
   * @returns twap data object
   */
  fetchTwapData(): TwapData {
    let twapData = new TwapData()

    const twapResponse = this.storageClient.get(this.getStorageIdentifier())
    if (twapResponse) twapData.setData(twapResponse)

    return twapData
  }
  
  /**
   * Saves twap data to the database
   * 
   * @param twapData twap data object
   * @returns success state for the data storage
   */
  saveTwapData(twapData: TwapData): boolean {
    this.storageClient.set(this.getStorageIdentifier(), twapData.toString())
    
    return true
  }

  /**
   * Execute a twap calculation on all recorded spot price data.
   * 
   * @returns void
   */
  aggregateTwapData(): void {
    // Fetch the latest spot price data and existing TWAP data.
    const spotPrice = this.fetchSpotPrice()
    const twapData = this.fetchTwapData()
    twapData.insertSpotPrice(spotPrice.ts, spotPrice.priceLast)

    let priceCumulative: f64 = 0.0
    let tsLast: i64 = 0
    let tsLatest: i64 = spotPrice.ts
    let tsElapsed: i64 = 0

    const pricesArray = twapData.prices._arr
    for (let i = 1; i < pricesArray.length; i++) {
      const price = <json.JSON.Obj>pricesArray[i]
      const priceLast = <json.JSON.Obj>pricesArray[i - 1]

      const priceTs = price.getInteger('ts')!._num
      const priceLastTs = priceLast.getInteger('ts')!._num
      const priceLastValue = <f64>priceLast.getFloat('value')!._num

      priceCumulative += priceLastValue * <f64>(priceTs - priceLastTs)
      if (i === 1) tsLast = priceLastTs
    }

    // Calculates the median price 
    tsElapsed = tsLatest - tsLast
    const priceAverage = (priceCumulative / <f64>tsElapsed) || 0

    // Saves the updated TWAP Data on Storage
    twapData.priceMean = priceAverage || spotPrice.priceLast
    this.saveTwapData(twapData)
  }
}