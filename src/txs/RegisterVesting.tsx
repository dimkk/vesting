import { useState } from "react"
import { useForm } from "react-hook-form"
import { addSeconds, getUnixTime } from "date-fns"
import axios from "axios"
import { toAmount } from "@terra.kitchen/utils"
import { AccAddress, MsgExecuteContract } from "@terra-money/terra.js"
import { useLCDClient, useWallet } from "@terra-money/wallet-provider"
import { useConnectedAddress } from "data/wallet"
import contract from "../contract"
import TxResult from "./TxResult"

interface Values {
  masterAddress?: AccAddress
  address: AccAddress
  startTime?: Date
  input: number
}

const n = 10 // times
const INTERVAL = 60 // seconds
const getEndTime = (date: Date) => addSeconds(date, n * INTERVAL)

const RegisterVesting = () => {
  const connectedAddress = useConnectedAddress()
  const lcd = useLCDClient()
  const { post } = useWallet()

  const { register, watch, handleSubmit } = useForm<Values>({
    defaultValues: {
      masterAddress: connectedAddress,
    },
  })

  const { startTime } = watch()
  const endTime = startTime && getEndTime(startTime)

  const [txhash, setTxHash] = useState("")

  const submit = async ({ masterAddress, address, ...values }: Values) => {
    const { startTime, input } = values

    if (!(startTime && endTime)) return

    const start_time = getUnixTime(startTime)
    const end_time = getUnixTime(endTime)
    const amount = toAmount(input)

    try {
      const periodic_vesting = {
        start_time: String(start_time),
        end_time: String(end_time),
        vesting_interval: String(INTERVAL),
        amount,
      }

      const msg = {
        register_vesting_account: {
          master_address: masterAddress,
          address,
          vesting_schedule: { periodic_vesting },
        },
      }

      const coins = Number(amount) * n + "uluna"

      console.log(start_time, end_time, amount, coins)

      const msgs = [
        new MsgExecuteContract(connectedAddress, contract, msg, coins),
      ]

      const txOptions = { msgs }
      await lcd.tx.create([{ address: connectedAddress }], txOptions)
      const { result, success } = await post(txOptions)
      if (!success) throw new Error(result.raw_log)
      setTxHash(result.txhash)
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : (error as Error).message

      alert(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>Register vesting</h1>

      <div>
        <label>Master address (optional)</label>
        <input
          {...register("masterAddress", {
            validate: (address) => !address || AccAddress.validate(address),
          })}
        />
      </div>

      <div>
        <label>Address</label>
        <input
          {...register("address", {
            required: true,
            validate: AccAddress.validate,
          })}
        />
      </div>

      <div>
        <label>Start time</label>
        <input
          {...register("startTime", { required: true, valueAsDate: true })}
          type="datetime-local"
        />
      </div>

      <div>
        <label>End time</label>
        {endTime && <time>{endTime.toString()}</time>}
      </div>

      <div>
        <label>Amount</label>
        <input
          {...register("input", { required: true, valueAsNumber: true })}
          type="decimal"
        />
      </div>

      <button type="submit">Submit</button>
      {txhash && <TxResult txhash={txhash} />}
    </form>
  )
}

export default RegisterVesting
