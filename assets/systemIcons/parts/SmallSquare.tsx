import { FC } from "react"

interface props {
  stroke?: string
  fill?: string
}
const SmallSquare: FC<props> = ({ stroke, fill }) => {
  const w = 140
  const wHalf = w / 2
  return (
    <rect
      x={256 - wHalf}
      y={256 - wHalf}
      width={w}
      height={w}
      stroke={stroke ? stroke : "black"}
      strokeWidth='12'
      fill={fill ? fill : "transparent"}
    />
  )
}
export default SmallSquare
