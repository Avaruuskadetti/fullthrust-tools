import { FC } from "react"

interface props {
  dashed?: boolean
}
const ScreenArcs: FC<props> = ({ dashed }) => {
  const largeArcWidth = 128
  const smallArcWidth = 86
  const distanceBetweenArcs = 32
  const smallArcRadius = 112
  const largeArcRadius = 165
  return (
    <>
      <path
        stroke='black'
        fill='transparent'
        strokeWidth='20'
        strokeDasharray={dashed ? "42" : ""}
        strokeLinecap='round'
        d={`
        M ${256 - largeArcWidth} ${276 - distanceBetweenArcs * 3}
        A ${largeArcRadius} ${largeArcRadius} 
        0 0 1 ${256 + largeArcWidth} ${276 - distanceBetweenArcs * 3}
      `}
      />
      <path
        stroke='black'
        fill='transparent'
        strokeWidth='20'
        strokeDasharray={dashed ? 39 : ""}
        strokeLinecap='round'
        d={`
        M ${256 - smallArcWidth} ${276 - distanceBetweenArcs}
        A ${smallArcRadius} ${smallArcRadius} 
        0 0 1 ${256 + smallArcWidth} ${276 - distanceBetweenArcs}
      `}
      />
    </>
  )
}
export default ScreenArcs
