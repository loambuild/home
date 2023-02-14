import type { SerializableContractData } from "../../protocols/types";

export interface Params extends SerializableContractData {
  nearContract: string
  cwContract: string
}

export function getContractData(): Params {
  if (!window.contractData) {
    throw new Error('Cannot use `getContractData` on this page')
  }

  const { contract, protocol } = window.contractData;
  return {
    nearContract: protocol === 'NEAR' ? contract : undefined,
    cwContract: protocol === 'CosmWasm' ? contract : undefined,
    ...window.contractData
  }
}

export function prettifyJsonString(input: string): string {
  try {
    return JSON.stringify(JSON.parse(input), null, 2)
  } catch {
    return input
  }
}