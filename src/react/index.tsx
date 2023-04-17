import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Layout } from './components'
import errorElement from './route-error'

const router = createBrowserRouter([
  {
    path: ':protocol/:contract?/:method?',
    errorElement,
    element: <Layout />,
  }
]);

export const ClientSideEntryPoint = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}
