import { FunctionComponent } from "react"
import BaseIcon from "./parts/BaseIcon"
import Pds from "./parts/Pds"

interface Props {}

const PointDefenseSystemIcon: FunctionComponent<Props> = () => {
  return (
    <BaseIcon>
      <Pds />
    </BaseIcon>
  )
}

export default PointDefenseSystemIcon
