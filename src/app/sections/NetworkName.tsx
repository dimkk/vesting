import { useWallet } from "@terra-money/wallet-provider"

const NetworkName = () => {
  const { network } = useWallet()

  return (
    <section>
      <code>{network.name}</code>
    </section>
  )
}

export default NetworkName
