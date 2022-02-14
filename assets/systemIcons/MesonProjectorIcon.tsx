import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import Meson from "./parts/Meson"

interface props {
  arcs: number[]
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const MesonProjectorIcon: FC<props> = ({ arcs }) => {
  return (
    <BaseIcon>
      <Circle fill='white' stroke='transparent' />
      <Meson />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default MesonProjectorIcon
