import { FC } from "react"
import { useWallet, WalletStatus } from "@terra-money/wallet-provider"

const InitWallet: FC = ({ children }) => {
  const { status } = useWallet()
  return status === WalletStatus.INITIALIZING ? null : <>{children}</>
}

export default InitWallet
