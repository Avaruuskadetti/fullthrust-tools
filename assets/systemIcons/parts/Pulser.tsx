import { FC } from "react"

interface props {
  stroke?: string
  arcs: number[]
}
const Pulser: FC<props> = ({ stroke, arcs }) => {
  const sq3 = Math.sqrt(3)
  return (
    <>
      <path
        stroke={stroke ? stroke : "black"}
        fill={arcs.includes(1) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M 256 10
          L ${256 - 41 * sq3} 123
          L ${256 + 41 * sq3} 123
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        fill={arcs.includes(4) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M 256 502
          L ${256 - 41 * sq3} ${502 - 123}
          L ${256 + 41 * sq3} ${502 - 123}
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        fill={arcs.includes(6) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 - 41 * sq3} 123
          L ${256 - 123 * sq3} 123
          L ${256 - 82 * sq3} 256
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        fill={arcs.includes(5) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 - 41 * sq3} 379
          L ${256 - 123 * sq3} 379
          L ${256 - 82 * sq3} 256
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        fill={arcs.includes(2) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 + 41 * sq3} 123
          L ${256 + 123 * sq3} 123
          L ${256 + 82 * sq3} 256
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        fill={arcs.includes(3) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 + 41 * sq3} 379
          L ${256 + 123 * sq3} 379
          L ${256 + 82 * sq3} 256
          Z
        `}
      />
    </>
  )
}
export default Pulser
