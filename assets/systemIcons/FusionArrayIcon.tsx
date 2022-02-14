import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Arcs from "./parts/Arcs"
import Circle from "./parts/Circle"
import Fusion from "./parts/Fusion"

interface props {
  arcs: number[]
}

const FusionArrayIcon: FC<props> = ({ arcs }) => {
  return (
    <BaseIcon>
      <Circle fill='white' stroke='transparent' />
      <Fusion />
      <Arcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
    </BaseIcon>
  )
}
export default FusionArrayIcon
