import { getContractData } from "../utils"
import { init } from "../../protocols/near"
import type { NearContractInterface } from "../../protocols/near"
import type { SerializableContractData } from "../../protocols/near"

type NearInterface = NearContractInterface & SerializableContractData & {
  cwContract?: string | undefined
  nearContract?: string | undefined
}

const cache: Record<string, NearInterface> = {}

// define as constant to avoid rerenders
const empty: Partial<NearInterface> = {}

export default function useNear(): NearInterface | typeof empty {
  const { nearContract, ...data } = getContractData()
  if (!nearContract) return empty
  cache[nearContract] = cache[nearContract] ?? {
    ...init(nearContract),
    ...data
  }
  return cache[nearContract]!
}
