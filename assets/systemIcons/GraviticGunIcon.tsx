import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import InnerCircle from "./parts/InnerCircle"
import InnerRing from "./parts/InnerRing"

interface props {
  arcs: number[]
  value: string
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const GraviticGunIcon: FC<props> = ({ arcs, value }) => {
  return (
    <BaseIcon value={value} textColor='white'>
      <Circle fill='white' stroke='transparent' />
      <InnerCircle fill='black' />
      <InnerRing stroke='white' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default GraviticGunIcon
