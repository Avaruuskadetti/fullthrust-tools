import { FC } from "react"

interface props {
  stroke?: string
  fill?: string
}
const SmallRectangle: FC<props> = ({ stroke, fill }) => {
  const w = 140
  const h = 280
  const wHalf = w / 2
  const hHalf = h / 2
  return (
    <rect
      x={256 - wHalf}
      y={256 - hHalf}
      width={w}
      height={h}
      stroke={stroke ? stroke : "black"}
      strokeWidth='12'
      fill={fill ? fill : "transparent"}
    />
  )
}
export default SmallRectangle
