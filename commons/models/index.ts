export interface TargetManpowerCell {
  id: string,
  organisationId?: string,
  sectionId?: string,
  roleId?: string,
  weekStart?: string,
  timeStart?: string,
  timeEnd?: string,
  manPower: number
}