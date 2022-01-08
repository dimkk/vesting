import { useQuery } from "react-query"
import { readAmount, readDenom } from "@terra.kitchen/utils"
import { useLCDClient } from "@terra-money/wallet-provider"
import { useAddress } from "data/wallet"
import Claim from "txs/Claim"
import contract from "../contract"

const renderDateFromSeconds = (seconds: string) =>
  new Date(Number(seconds) * 1000).toString()

const PeriodicSchedule = ({ amount, ...props }: PeriodicVesting) => {
  const { start_time, end_time, vesting_interval } = props

  const contents = [
    { title: "Start time", content: renderDateFromSeconds(start_time) },
    { title: "End time", content: renderDateFromSeconds(end_time) },
    { title: "Vesting interval", content: `${vesting_interval} seconds` },
  ]

  return (
    <>
      {contents.map(({ title, content }) => (
        <article key={title}>
          <h2>{title}</h2>
          <p>{content}</p>
        </article>
      ))}
    </>
  )
}

const QueryVesting = () => {
  const address = useAddress()
  const lcd = useLCDClient()

  const { data, isLoading, error } = useQuery("vesting_account", () =>
    lcd.wasm.contractQuery<VestingAccount>(contract, {
      vesting_account: { address },
    })
  )

  if (error) return <p>Error</p>
  if (isLoading) return <p>Loading...</p>
  if (!data) return null

  const {
    master_address,
    vesting_denom,
    vesting_amount,
    vested_amount,
    vesting_schedule,
    claimable_amount,
  } = data

  const token = vesting_denom.native
  const readCoin = (amount: string, denom: string) =>
    [readAmount(amount), readDenom(denom)].join(" ")

  const contents = [
    { title: "Master address", content: master_address },
    { title: "Amount", content: readCoin(vesting_amount, token) },
    { title: "Vested amount", content: readCoin(vested_amount, token) },
    { title: "Claimable amount", content: readCoin(claimable_amount, token) },
  ]

  return (
    <article>
      <h1>Query vesting</h1>
      {contents.map(({ title, content }) => (
        <article key={title}>
          <h2>{title}</h2>
          <p>{content}</p>
        </article>
      ))}

      <Claim />

      <PeriodicSchedule {...vesting_schedule.periodic_vesting} />
    </article>
  )
}

export default QueryVesting
