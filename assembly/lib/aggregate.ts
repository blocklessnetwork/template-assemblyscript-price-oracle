import { SampleSource } from "./sources/sampleSource"

/**
 * Aggregate API response and compute TWAP for sources
 * 
 */
const runAggregate = (): void => {

  /**
   * Write your aggregation logic here:
   * 
   */
  const sampleSource1 = new SampleSource(
    'sample_source_1',
    '{{URL_FOR_SOURCE_1}}'
  )
  sampleSource1.aggregateTwapData()

  process.stdout.write('success')
}

export default runAggregate