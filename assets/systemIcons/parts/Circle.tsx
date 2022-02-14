import { FC } from "react"

interface props {
  stroke?: string
  fill?: string
}
const Circle: FC<props> = ({ stroke, fill }) => (
  <circle
    cx='256'
    cy='256'
    r='248'
    stroke={stroke ? stroke : "black"}
    strokeWidth='12'
    fill={fill ? fill : "transparent"}
  />
)
export default Circle
