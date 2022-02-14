import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import InnerCircle from "./parts/InnerCircle"

interface props {
  arcs: number[]
  value: string
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const GraserIcon: FC<props> = ({ arcs, value }) => {
  return (
    <BaseIcon value={value} textColor='white'>
      <Circle fill='white' stroke='transparent' />
      <InnerCircle fill='black' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default GraserIcon
