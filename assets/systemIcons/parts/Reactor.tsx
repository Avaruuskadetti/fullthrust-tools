import { FunctionComponent } from "react"
interface ReactorProps {
  gapX: number
  gapY: number
}

const Reactor: FunctionComponent<ReactorProps> = ({ gapX, gapY }) => {
  const midX = 360 * 2 + 180 + gapX * 3
  const midY = 180 + gapY
  return (
    <>
      <rect
        x={gapX * 3 + 360 * 2}
        y={gapY}
        width={360}
        height={360}
        stroke='black'
        fill='black'
      />
      <circle cx={midX} cy={midY} r={30} fill='white' />
      <ellipse
        cx={midX}
        cy={midY}
        rx={60}
        ry={140}
        stroke='white'
        strokeWidth='12'
        fill='transparent'
        transform={`rotate(30 ${midX} ${midY})`}
      />
      <ellipse
        cx={midX}
        cy={midY}
        rx={60}
        ry={140}
        stroke='white'
        strokeWidth='12'
        fill='transparent'
        transform={`rotate(150 ${midX} ${midY})`}
      />
      <ellipse
        cx={midX}
        cy={midY}
        rx={60}
        ry={140}
        stroke='white'
        strokeWidth='12'
        fill='transparent'
        transform={`rotate(270 ${midX} ${midY})`}
      />
    </>
  )
}

export default Reactor
