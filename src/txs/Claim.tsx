import { useState } from "react"
import axios from "axios"
import { MsgExecuteContract } from "@terra-money/terra.js"
import { useLCDClient, useWallet } from "@terra-money/wallet-provider"
import { useConnectedAddress } from "data/wallet"
import contract from "../contract"
import TxResult from "./TxResult"

const Claim = () => {
  const connectedAddress = useConnectedAddress()
  const lcd = useLCDClient()
  const { post } = useWallet()

  const [txhash, setTxHash] = useState("")

  const submit = async () => {
    try {
      const msg = { claim: { recipient: connectedAddress } }
      const msgs = [new MsgExecuteContract(connectedAddress, contract, msg)]
      const txOptions = { msgs }
      await lcd.tx.create([{ address: connectedAddress }], txOptions)
      const { result, success } = await post(txOptions)
      if (!success) throw new Error(result.raw_log)
      setTxHash(result.txhash)
    } catch (error) {
      console.log({ ...(error as Error) })
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : (error as Error).message

      alert(message)
    }
  }

  return (
    <>
      <button onClick={submit}>Claim</button>
      {txhash && <TxResult txhash={txhash} />}
    </>
  )
}

export default Claim
