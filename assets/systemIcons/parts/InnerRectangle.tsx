import { FC } from "react"

interface props {
  stroke?: string
  fill?: string
}
const InnerRectangle: FC<props> = ({ stroke, fill }) => {
  const rOut = 248
  const rIn = 170
  return (
    <path
      stroke={stroke ? stroke : "black"}
      fill={fill ? fill : "black"}
      strokeWidth='12'
      d={`
          M ${256 - 90} ${256 - 130}
          L ${256 + 90} ${256 - 130}
          L ${256 + 90} ${256 + 130}
          L ${256 - 90} ${256 + 130}
          Z
        `}
    />
  )
}
export default InnerRectangle
