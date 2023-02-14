import type { FC } from "react";
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import type { SerializableContractData } from "../protocols/types";
import { WithWBRs } from './components'

export const ClientSideEntryPoint: FC<{ contractData: SerializableContractData }> = ({
  contractData,
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <h1><WithWBRs word={contractData.contract} /></h1>
    </TooltipProvider>
  )
}