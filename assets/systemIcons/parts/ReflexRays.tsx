import { FunctionComponent } from "react"
interface ReflexRaysProps {
  innerRadius: number
  outerRadius: number
}

const ReflexRays: FunctionComponent<ReflexRaysProps> = ({
  innerRadius,
  outerRadius,
}) => {
  return (
    <>
      <circle
        cx={256}
        cy={256}
        r={outerRadius + 6}
        stroke='black'
        strokeWidth='12'
        fill='transparent'
      />
      <circle
        cx={256}
        cy={256}
        r={(outerRadius - innerRadius) / 2 + innerRadius}
        stroke='black'
        strokeWidth='12'
        fill='transparent'
      />
    </>
  )
}

export default ReflexRays
