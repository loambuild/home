import { getContractData } from "../utils"
import { init } from "../../protocols/near"
import type { NearContractInterface } from "../../protocols/near"
import type { SerializableContractData } from "../../protocols/near"

type NearInterface = NearContractInterface & SerializableContractData & {
  cwContract?: string | undefined
  nearContract?: string | undefined
}

const cache: Record<string, NearInterface> = {}

export default function useNear(): NearInterface | undefined {
  const { nearContract, ...data } = getContractData()
  if (!nearContract) return undefined
  cache[nearContract] = cache[nearContract] ?? {
    ...init(nearContract),
    ...data
  }
  return cache[nearContract]
}
