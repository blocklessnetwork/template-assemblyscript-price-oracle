
import { http, json } from "@blockless/sdk"

export class HttpClientOptions {
  public baseUrl: string
  public headers: Map<string, string>

  constructor(baseUrl: string, headers: Map<string, string>) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  public getHeaders(): string {
    const obj = new json.JSON.Obj
    const keys = this.headers.keys()

    for (let i = 0; i < this.headers.size; i++) {
      obj.set(keys[i], this.headers.get(keys[i]))
    }

    return obj.toString()
  }
}

export class HttpClient {
  options: HttpClientOptions

  constructor(options: HttpClientOptions = new HttpClientOptions('', new Map())) {
    this.options = options
  }

  private formatUrl(url: string): string {
    return this.options.baseUrl ? this.options.baseUrl + url : url
  }

  get(url: string): json.JSON.Obj {
    const options = new http.HttpOptions('GET')
    options.headers = this.options.getHeaders()

    return HttpClient.request(this.formatUrl(url), options)
  }

  post(url: string, body: string): json.JSON.Obj {
    const options = new http.HttpOptions("POST")
    options.headers = this.options.getHeaders()

    if (body) options.body = body

    return HttpClient.request(this.formatUrl(url), options)
  }

  static request(url: string, options: http.HttpOptions): json.JSON.Obj {
    let body: string | null = null
    let response: json.JSON.Obj = <json.JSON.Obj>json.JSON.parse('{}')
    const handle: http.HttpHandle | null = http.HttpOpen(url, options)

    if (handle != null) {
      body = handle.getAllBody()!      
      handle.close()

      // TODO: Parse non JSON content types as well
      if (body) {
        response = <json.JSON.Obj>json.JSON.parse(body)
      }
    }

    return response
  }
}