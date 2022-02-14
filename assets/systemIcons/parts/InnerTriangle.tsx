import { FC } from "react"

interface props {
  stroke?: string
  fill?: string
}
const InnerTriangle: FC<props> = ({ stroke, fill }) => {
  const rOut = 248
  const rIn = 170
  return (
    <path
      stroke={stroke ? stroke : "black"}
      fill={fill ? fill : "transparent"}
      strokeWidth='6'
      d={`
          M ${256} ${256 + rIn}
          L ${256 - 85 * Math.sqrt(2)} ${256 - 85 * Math.sqrt(2)}
          L ${256 + 85 * Math.sqrt(2)} ${256 - 85 * Math.sqrt(2)}
          Z
        `}
    />
  )
}
export default InnerTriangle
