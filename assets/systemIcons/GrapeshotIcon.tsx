import { FunctionComponent } from "react"
import BaseIcon from "./parts/BaseIcon"
import Grapeshot from "./parts/Grapeshot"

interface Props {}

const GrapeshotIcon: FunctionComponent<Props> = () => {
  return (
    <BaseIcon>
      <Grapeshot />
    </BaseIcon>
  )
}

export default GrapeshotIcon
