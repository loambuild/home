export type Protocols = "NEAR" | "CosmWasm" | "Soroban"

export function isProtocol(s: string): Protocols {
  if (["NEAR", "CosmWasm", "Soroban"].includes(s)) {
    return s as Protocols;
  }
  throw new Error(`incorrect protocol ${s}`);
}
