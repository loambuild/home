import type { SerializableContractData } from "../../protocols/types";

declare global {
  interface Window {
    contractData?: SerializableContractData;
  }
}