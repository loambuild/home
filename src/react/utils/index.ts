import type { SerializableContractData } from "../../protocols/types";

export interface Params extends SerializableContractData {
  nearContract: string
  cwContract: string
}

const cache: Record<string, Params> = {}

export function getContractData(): Params {
  if (!window.contractData) {
    throw new Error('Cannot use `getContractData` on this page')
  }
  const { contract, protocol, method } = window.contractData;
  const cacheKey = `${protocol}:${contract}`

  if (cache[cacheKey]) return cache[cacheKey]!

  cache[cacheKey] = {
    nearContract: protocol === 'NEAR' ? contract : undefined,
    cwContract: protocol === 'CosmWasm' ? contract : undefined,
    method,
    ...window.contractData
  }

  return cache[cacheKey]!
}

export function prettifyJsonString(input: string): string {
  try {
    return JSON.stringify(JSON.parse(input), null, 2)
  } catch {
    return input
  }
}
