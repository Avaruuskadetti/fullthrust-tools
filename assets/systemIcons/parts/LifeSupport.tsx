import { FunctionComponent } from "react"
interface LifeSupportProps {
  gapX: number
  gapY: number
}

const LifeSupport: FunctionComponent<LifeSupportProps> = ({ gapX, gapY }) => {
  const midX = 360 + 180 + gapX * 2
  const midY = 180 + gapY
  return (
    <>
      <rect
        x={gapX * 2 + 360}
        y={gapY}
        width={360}
        height={360}
        stroke='black'
        fill='black'
      />
      <ellipse
        cx={midX}
        cy={midY}
        rx={120}
        ry={140}
        stroke='white'
        strokeWidth='12'
        fill='transparent'
      />
      <circle cx={midX} cy={midY - 80} r={30} fill='white' />
      <path
        fill='white'
        stroke='white'
        strokeWidth='12'
        strokeLinejoin='round'
        d={`
        M ${midX} ${midY - 25}
        l 70 -20
        l -50 40
        l -20 110
        l -20 -110
        l -50 -40
        z
      `}
      />
    </>
  )
}

export default LifeSupport
