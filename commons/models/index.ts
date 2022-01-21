export interface TargetManpowerCell {
  id: string,
  role: string,
  weekStart?: string,
  timeStart?: string,
  timeEnd?: string,
  manPower: number
}

export interface TargetManpowerDaySum {
  id: string,
  date: string,
  value: number,
  role: string
}