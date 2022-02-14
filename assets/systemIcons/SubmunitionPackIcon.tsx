import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import SubmunitionPack from "./parts/SubmunitionPack"

interface props {
  arcs: number[]
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const SubmunitionPackIcon: FC<props> = ({ arcs }) => {
  return (
    <BaseIcon>
      <Circle fill='white' stroke='transparent' />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
      <SubmunitionPack />
    </BaseIcon>
  )
}
export default SubmunitionPackIcon
