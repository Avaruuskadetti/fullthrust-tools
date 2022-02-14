import { FC } from "react"

interface props {
  color?: string
}
const Pulse: FC<props> = ({ color }) => {
  const spikeLength = 85
  const spikeWidth = 25
  const circleRadius = 76
  return (
    <>
      <circle
        fill={color ? color : "white"}
        stroke={color ? color : "white"}
        r={circleRadius}
        cx={256}
        cy={256}
      />
      <path
        stroke={color ? color : "white"}
        fill={color ? color : "white"}
        strokeWidth='12'
        d={`
        M ${256 + spikeLength} ${256 + spikeLength}
        L ${256 - spikeWidth} ${256 + spikeWidth}
        L ${256 - spikeLength} ${256 - spikeLength}
        L ${256 + spikeWidth} ${256 - spikeWidth}
        Z
        `}
      />
      <path
        stroke={color ? color : "white"}
        fill={color ? color : "white"}
        strokeWidth='12'
        d={`
        M ${256 - spikeLength} ${256 + spikeLength}
        L ${256 - spikeWidth} ${256 - spikeWidth}
        L ${256 + spikeLength} ${256 - spikeLength}
        L ${256 + spikeWidth} ${256 + spikeWidth}
        Z
        `}
      />
    </>
  )
}
export default Pulse
