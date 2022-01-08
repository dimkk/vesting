import { useRoutes } from "react-router-dom"
import { useAddress } from "data/wallet"
import Nav, { routes } from "./sections/Nav"
import NetworkName from "./sections/NetworkName"
import Connect from "./sections/Connect"

const App = () => {
  const address = useAddress()
  const element = useRoutes(routes)

  return (
    <article>
      <Nav />
      <h1>Token vesting</h1>
      <NetworkName />
      <Connect />
      {address && <main>{element}</main>}
    </article>
  )
}

export default App
