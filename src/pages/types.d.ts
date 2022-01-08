interface VestingAccount {
  master_address: string
  address: string
  vesting_denom: VestingDenom
  vesting_amount: string
  vested_amount: string
  vesting_schedule: VestingSchedule
  claimable_amount: string
}

interface VestingDenom {
  native: string
}

interface VestingSchedule {
  periodic_vesting: PeriodicVesting
}

interface PeriodicVesting {
  start_time: string
  end_time: string
  vesting_interval: string
  amount: string
}
