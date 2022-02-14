import { FC } from "react"

interface props {
  stroke?: string
  fill?: string
  arcs: number[]
}
const KineticGun: FC<props> = ({ stroke, fill, arcs }) => {
  const sq3 = Math.sqrt(3)

  const innerSideHalf = 92.37604
  const outerSideHalf = 1.5 * innerSideHalf

  return (
    <>
      <path
        fill={fill ? fill : "white"}
        strokeWidth='12'
        d={`
          M ${256 - innerSideHalf} ${256 - 160}
          L ${256 + innerSideHalf} ${256 - 160}
          L ${256 + innerSideHalf * 2} 256
          L ${256 + innerSideHalf} ${256 + 160}
          L ${256 - innerSideHalf} ${256 + 160}
          L ${256 - innerSideHalf * 2} 256
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        strokeLinejoin='round'
        fill={arcs.includes(1) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 - innerSideHalf} ${256 - 160}
          L ${256 + innerSideHalf} ${256 - 160}
          L ${256 + outerSideHalf} ${256 - 240}
          L ${256 - outerSideHalf} ${256 - 240}
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        strokeLinejoin='round'
        fill={arcs.includes(4) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 - innerSideHalf} ${256 + 160}
          L ${256 + innerSideHalf} ${256 + 160}
          L ${256 + outerSideHalf} ${256 + 240}
          L ${256 - outerSideHalf} ${256 + 240}
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        strokeLinejoin='round'
        fill={arcs.includes(6) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
          M ${256 - innerSideHalf} ${256 - 160}
          L ${256 - innerSideHalf * 2} 256
          L ${256 - outerSideHalf * 2} 256
          L ${256 - outerSideHalf} ${256 - 240}
          Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        strokeLinejoin='round'
        fill={arcs.includes(5) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
        M ${256 - innerSideHalf} ${256 + 160}
        L ${256 - innerSideHalf * 2} 256
        L ${256 - outerSideHalf * 2} 256
        L ${256 - outerSideHalf} ${256 + 240}
        Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        strokeLinejoin='round'
        fill={arcs.includes(2) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
        M ${256 + innerSideHalf} ${256 - 160}
        L ${256 + innerSideHalf * 2} 256
        L ${256 + outerSideHalf * 2} 256
        L ${256 + outerSideHalf} ${256 - 240}
        Z
        `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        strokeLinejoin='round'
        fill={arcs.includes(3) ? "white" : "rgba(0,0,0,0.5)"}
        strokeWidth='12'
        d={`
        M ${256 + innerSideHalf} ${256 + 160}
        L ${256 + innerSideHalf * 2} 256
        L ${256 + outerSideHalf * 2} 256
        L ${256 + outerSideHalf} ${256 + 240}
        Z
        `}
      />
    </>
  )
}
export default KineticGun
