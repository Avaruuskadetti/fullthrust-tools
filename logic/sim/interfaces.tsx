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
export interface turn {
  a: number
  b: number
}
export interface order {
  turn: turn
  acceleration: number
}
