import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import InnerRectangle from "./parts/InnerRectangle"

interface props {
  arcs: number[]
  value: string
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const PhaserIcon: FC<props> = ({ arcs, value }) => {
  return (
    <BaseIcon value={value} textColor='white'>
      <Circle fill='white' stroke='transparent' />
      <InnerRectangle fill='black' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default PhaserIcon
