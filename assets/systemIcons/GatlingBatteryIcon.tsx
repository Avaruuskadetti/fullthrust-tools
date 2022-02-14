import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import Gatling from "./parts/Gatling"

interface props {
  arcs: number[]
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const GatlingBatteryIcon: FC<props> = ({ arcs }) => {
  return (
    <BaseIcon>
      <Circle fill='white' stroke='transparent' />
      <Gatling />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default GatlingBatteryIcon
