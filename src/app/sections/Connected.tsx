import { truncate } from "@terra.kitchen/utils"
import { useWallet } from "@terra-money/wallet-provider"
import { useConnectedAddress } from "data/wallet"

const Connected = () => {
  const { disconnect } = useWallet()
  const address = useConnectedAddress()

  return (
    <>
      <code>{truncate(address)}</code>
      <button onClick={disconnect}>Disconnect</button>
    </>
  )
}

export default Connected
