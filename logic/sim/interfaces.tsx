export interface position {
  x: number
  y: number
  facing: number
}
export interface simShip {
  position: position
  drive: number
  velocity: number
}
export interface armorRow {
  regen: number // regen armor base value
  regenLeft: number // regen armor currently intact
  regenLost: number // regen armor permanently lost
  armor: number // armor base value
  armorLeft: number // armor left
}
export interface simulationShip {
  armor: armorRow[]
  hull: number[]
  screen: number
}
export interface turn {
  a: number
  b: number
}
export interface order {
  turn: turn
  acceleration: number
}
