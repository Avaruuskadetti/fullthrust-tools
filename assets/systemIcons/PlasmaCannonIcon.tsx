import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import InnerRing from "./parts/InnerRing"

interface props {
  arcs: number[]
  value: string
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const PlasmaCannonIcon: FC<props> = ({ arcs, value }) => {
  return (
    <BaseIcon value={value}>
      <Circle fill='white' stroke='transparent' />
      <InnerRing stroke='black' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default PlasmaCannonIcon
