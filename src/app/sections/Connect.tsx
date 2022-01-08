import { useConnectedWallet, useWallet } from "@terra-money/wallet-provider"
import Connected from "./Connected"

const Connect = () => {
  const { connect, availableConnections } = useWallet()
  const connected = useConnectedWallet()

  if (connected) return <Connected />

  return (
    <>
      {availableConnections.map(({ type, identifier, name }) => (
        <button
          onClick={() => connect(type, identifier)}
          key={type + identifier}
        >
          {name}
        </button>
      ))}
    </>
  )
}

export default Connect
