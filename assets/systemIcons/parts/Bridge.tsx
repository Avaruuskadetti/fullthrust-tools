import { FunctionComponent } from "react"
interface BridgeProps {
  gapX: number
  gapY: number
}

const Bridge: FunctionComponent<BridgeProps> = ({ gapX, gapY }) => {
  const midX = 180 + gapX
  const midY = 180 + gapY
  const circleRadius = 50
  const lineGap = 50
  const lineWidth = 220
  return (
    <>
      <rect
        x={gapX}
        y={gapY}
        width={360}
        height={360}
        stroke='black'
        fill='black'
      />
      <circle
        cx={midX}
        cy={midY - circleRadius}
        r={circleRadius}
        stroke='white'
        strokeWidth='30'
      />
      <path
        stroke='white'
        strokeWidth='30'
        d={`
          M ${midX - lineWidth / 2} ${midY}
          l ${lineWidth} 0
        `}
      />
      <path
        stroke='white'
        strokeWidth='30'
        d={`
          M ${midX - lineWidth / 2} ${midY + lineGap}
          l ${lineWidth} 0
        `}
      />
      <path
        stroke='white'
        strokeWidth='30'
        d={`
          M ${midX - lineWidth / 2} ${midY + lineGap * 2}
          l ${lineWidth} 0
        `}
      />
    </>
  )
}

export default Bridge
