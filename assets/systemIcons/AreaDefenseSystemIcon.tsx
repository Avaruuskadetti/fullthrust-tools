import { FunctionComponent } from "react"
import BaseIcon from "./parts/BaseIcon"
import Pds from "./parts/Pds"
import SmallArcs from "./parts/SmallArcs"

interface Props {
  arcs: number[]
}

const AreaDefenseSystemIcon: FunctionComponent<Props> = ({ arcs }) => {
  return (
    <BaseIcon>
      <SmallArcs arcs={[1, 2, 3, 4, 5, 6]} select={arcs} />
      <Pds />
    </BaseIcon>
  )
}

export default AreaDefenseSystemIcon
