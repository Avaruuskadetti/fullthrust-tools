import { fighter } from "./fighters"
import { weapon } from "./weapons"
import { ordnance } from "./ordnance"

export interface ship {
  id: number
  name: string
  mass: number
  hull: number
  hullRows: number
  armor: number[]
  regenArmor: number[]
  stealthHull: string
  drive: number
  driveType: string
  ftlDrive: string
  streamlining: string
  hangars: number
  launchTubes: number
  launchCatapults: boolean
  fighterRacks: number
  gunboatRacks: number
  fighters: fighter[]
  cargoSpaces: number
  passengerSpaces: number
  marineSpaces: number
  extraDCP: number
  marines: number
  flawed: boolean
  systems: any
  weapons: weapon[]
  ordnance: ordnance[]
}
