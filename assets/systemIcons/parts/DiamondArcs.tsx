import { FC } from "react"

interface props {
  dashed?: boolean
}
const DiamondArcs: FC<props> = ({ dashed }) => {
  const largeArcWidth = 175
  const smallArcWidth = 120
  const largeArcHeight = 25
  const smallArcHeight = -30
  const smallArcRadius = 112
  const largeArcRadius = 165
  return (
    <>
      <path
        stroke='black'
        fill='transparent'
        strokeWidth='20'
        strokeDasharray={dashed ? "42" : ""}
        strokeLinecap='square'
        d={`
        M ${256 - largeArcWidth} ${276 - largeArcHeight}
        l ${largeArcWidth} ${-largeArcWidth}
        L ${256 + largeArcWidth} ${276 - largeArcHeight}
      `}
      />
      <path
        stroke='black'
        fill='transparent'
        strokeWidth='20'
        strokeDasharray={dashed ? 39 : ""}
        strokeLinecap='square'
        d={`
        M ${256 - smallArcWidth} ${276 - smallArcHeight}
        l ${smallArcWidth} ${-smallArcWidth}
        L ${256 + smallArcWidth} ${276 - smallArcHeight}
      `}
      />
    </>
  )
}
export default DiamondArcs
