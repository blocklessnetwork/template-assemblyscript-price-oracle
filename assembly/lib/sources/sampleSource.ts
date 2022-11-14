import { HttpClient, HttpClientOptions } from "../../utils/http"
import SpotPriceData from "../common/spotPriceData"
import BaseSource from "./baseSource"

export class SampleSource extends BaseSource {
  private httpClient: HttpClient

  /**
   * Construct the data source class, extends the BaseSource class.
   * 
   * @param id unique identifier of the data source
   * @param source json API for the data source
   */
  constructor(id: string, source: string) {
    super(id, 'Sample Source')

    const httpClientHeaders = new Map<string, string>()
    const httpClientOptions = new HttpClientOptions(
      source,
      httpClientHeaders
    )

    this.httpClient = new HttpClient(httpClientOptions)
  }

  /**
   * Fetches the spot price from the remote source
   * 
   * @returns spot price and timestamp 
   */
  fetchSpotPrice(): SpotPriceData {
    let spotPriceData = new SpotPriceData()

    if (this.httpClient) {
      const response = this.httpClient.get('/')

      /**
       * Use the HTTP response to the spot price data.
       * 
       * An example:
       * 
       * ```
       *  spotPriceData.setData(
       *    <i64>response.getInteger('lastUpdated')!._num,
       *    <f64>markets.getFloat('last')!._num
       *  )
       * ```
       */
    }

    return spotPriceData
  }
}