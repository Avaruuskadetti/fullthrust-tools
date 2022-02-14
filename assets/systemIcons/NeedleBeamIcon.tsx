import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import InnerCircle from "./parts/InnerCircle"

const parseClass = (value: string): string => {
  switch (value) {
    case "1":
      return "I"
    case "2":
      return "II"
    case "3":
      return "III"
    case "4":
      return "IV"
    case "5":
      return "V"
    default:
      return value
  }
}

interface props {
  arcs: number[]
  value: string
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const NeedleBeamIcon: FC<props> = ({ arcs, value }) => {
  return (
    <BaseIcon value={parseClass(value)} textColor='white'>
      <Circle fill='white' stroke='transparent' />
      <InnerCircle fill='black' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default NeedleBeamIcon
