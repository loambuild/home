import type { RJSFSchema } from "@rjsf/utils"

// actual JSONSchema seems to always require 'type' (unless multiple libraries
// are malformed), but CosmWasm's variant either uses 'type' XOR 'oneOf'
export type JSONSchema =
  Omit<RJSFSchema, 'type'> |
  Omit<RJSFSchema, 'oneOf'>

// export type JSONSchema = RJSFSchema;

export type ContractMethod = {
  title: string
  link: string
}

export interface ContractMethodGroup {
  heading: string
  methods: ContractMethod[]
}

export interface SerializableContractData {
  contract: string
  protocol: 'NEAR' | 'CosmWasm' | 'Soroban'
  schema: JSONSchema
  methods: ContractMethodGroup[]
}
