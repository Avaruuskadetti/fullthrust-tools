import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import InnerCircle from "./parts/InnerCircle"
import InnerTriangle from "./parts/InnerTriangle"

interface props {
  arcs: number[]
  value: string
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const HeavyGraserIcon: FC<props> = ({ arcs, value }) => {
  return (
    <BaseIcon
      value={value}
      textColor='white'
      fontSize={0.9}
      textMargin='0 0 0.3rem 0'
    >
      <Circle fill='white' stroke='transparent' />
      <InnerTriangle fill='black' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default HeavyGraserIcon
