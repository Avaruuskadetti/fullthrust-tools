import { FC } from "react"

interface props {
  stroke?: string
}
const Fusion: FC<props> = ({ stroke }) => {
  const wHalf = 100
  const hHalf = 80
  const arc = 30
  const shrink = 20
  return (
    <>
      <path
        stroke={stroke ? stroke : "black"}
        fill='transparent'
        strokeWidth='12'
        d={`
        M ${256 + wHalf} ${256 - hHalf}
        A ${arc} ${arc} 0 0 1 
        ${256 + wHalf + arc} ${256 - hHalf + arc}
        L ${256 + wHalf + arc} ${256 + hHalf - arc}
        A ${arc} ${arc} 0 0 1 
        ${256 + wHalf} ${256 + hHalf}
        L ${256 - wHalf} ${256 + hHalf}
        A ${arc} ${arc} 0 0 1 
        ${256 - wHalf - arc} ${256 + hHalf - arc}
        L ${256 - wHalf - arc} ${256 - hHalf + arc}
        A ${arc} ${arc} 0 0 1 
        ${256 - wHalf} ${256 - hHalf}
        Z
      `}
      />
      <path
        stroke={stroke ? stroke : "black"}
        fill='transparent'
        strokeWidth='12'
        d={`
        M ${256 + wHalf - shrink} ${256 - hHalf + shrink}
        A ${arc} ${arc} 0 0 1 
        ${256 + wHalf - shrink + arc} ${256 - hHalf + shrink + arc}
        L ${256 + wHalf - shrink + arc} ${256 + hHalf - shrink - arc}
        A ${arc} ${arc} 0 0 1 
        ${256 + wHalf - shrink} ${256 + hHalf - shrink}
        L ${256 - wHalf + shrink} ${256 + hHalf - shrink}
        A ${arc} ${arc} 0 0 1 
        ${256 - wHalf + shrink - arc} ${256 + hHalf - shrink - arc}
        L ${256 - wHalf + shrink - arc} ${256 - hHalf + shrink + arc}
        A ${arc} ${arc} 0 0 1 
        ${256 - wHalf + shrink} ${256 - hHalf + shrink}
        Z
      `}
      />
    </>
  )
}
export default Fusion
