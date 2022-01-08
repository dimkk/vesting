import { StrictMode } from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider"
import { BRIDGE } from "config/constants"
import "./index.scss"
import InitWallet from "app/InitWallet"
import App from "app/App"

const queryClient = new QueryClient()

getChainOptions().then((chainOptions) => {
  render(
    <StrictMode>
      <BrowserRouter>
        <WalletProvider {...chainOptions} connectorOpts={{ bridge: BRIDGE }}>
          <QueryClientProvider client={queryClient}>
            <InitWallet>
              <App />
            </InitWallet>
          </QueryClientProvider>
        </WalletProvider>
      </BrowserRouter>
    </StrictMode>,
    document.getElementById("root")
  )
})
