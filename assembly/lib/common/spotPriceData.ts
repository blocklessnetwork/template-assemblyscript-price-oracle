export default class SpotPriceData {
  public ts: i64
  public priceLast: f64

  constructor() {
    this.ts = 0
    this.priceLast = 0.0
  }

  setData(ts: i64, priceLast: f64): void {
    this.ts = ts
    this.priceLast = priceLast
  }

  toString(): string {
    return ''
  }
}
