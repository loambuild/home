import { BrowserRouter } from "react-router-dom";
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { CosmWasmContract, NearContract } from './components'
import { getContractData } from './utils'

export const ClientSideEntryPoint = () => {
  const { nearContract, cwContract, contract } = getContractData()
  return (
    <TooltipProvider delayDuration={0}>
      <BrowserRouter>
        {nearContract
          ? <NearContract />
          : cwContract
            ? <CosmWasmContract />
            : <h1>Uh Oh</h1>}
      </BrowserRouter>
    </TooltipProvider>
  )
}