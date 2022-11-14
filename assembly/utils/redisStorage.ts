import Env from "./env"
import { HttpClient, HttpClientOptions } from "./http"

export default class RedisStorage {
  private storageClient: HttpClient

  /**
   * Initialize an instance of Redis Storage
   * 
   */
  constructor() {
    const storageClientHeaders = new Map<string, string>()
    storageClientHeaders.set('Authorization', `Bearer ${Env.STORAGE_ACCESS_TOKEN}`)

    const storageClientOptions = new HttpClientOptions(
      Env.STORAGE_ENDPOINT,
      storageClientHeaders
    )

    this.storageClient = new HttpClient(storageClientOptions)
  }

  get(key: string): string {
    let value = ''
    
    if (this.storageClient) {
      const response = this.storageClient.get('/get/' + key)

      if (response.has('result') && !response.get('result')!.isNull) {
        value = response.getString('result')!.toString()
      }
    }

    return value
  }

  set(key: string, value: string): void {
    if (this.storageClient) {
      this.storageClient.get('/set/' + key + '/' + value)
    }
  }
}