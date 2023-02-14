import type { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import type { SerializableContractData } from "../protocols/types";
import { WithWBRs, Layout } from './components'

export const ClientSideEntryPoint: FC<{ contractData: SerializableContractData }> = ({
  contractData,
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <BrowserRouter>
        <Layout>
          <h1><WithWBRs word={contractData.contract} /></h1>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  )
}