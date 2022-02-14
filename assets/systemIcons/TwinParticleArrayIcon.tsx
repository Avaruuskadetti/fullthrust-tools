import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import TwinParticle from "./parts/TwinParticle"

interface props {
  arcs: number[]
}
/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const TwinParticleArrayIcon: FC<props> = ({ arcs }) => {
  return (
    <BaseIcon>
      <Circle fill='white' stroke='transparent' />
      <TwinParticle />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default TwinParticleArrayIcon
