import { truncate } from "@terra.kitchen/utils"
import { useWallet } from "@terra-money/wallet-provider"
import { FINDER } from "config/constants"

const TxResult = ({ txhash }: { txhash: string }) => {
  const { network } = useWallet()
  const link = [FINDER, network.name, "tx", txhash].join("/")

  return (
    <a href={link} target="_blank" rel="noreferrer">
      {truncate(txhash)}
    </a>
  )
}

export default TxResult
