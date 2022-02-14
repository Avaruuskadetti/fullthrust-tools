import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Pulser from "./parts/Pulser"

interface props {
  arcs: number[]
}
const PulserIcon: FC<props> = ({ arcs }) => (
  <BaseIcon>
    <Pulser arcs={arcs} />
  </BaseIcon>
)
export default PulserIcon
