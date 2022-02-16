import { FC } from "react"

interface props {
  radius?: number
  fill?: string
  stroke?: string
  centered?: boolean
}
const ScreenCircle: FC<props> = ({ radius, fill, stroke, centered }) => (
  <circle
    cx={256}
    cy={256 + (!centered ? (radius ? radius + 20 : 80) : 0)}
    r={radius ? radius : 60}
    stroke={stroke ? stroke : "transparent"}
    strokeWidth='12'
    fill={fill ? fill : "black"}
  />
)
export default ScreenCircle
