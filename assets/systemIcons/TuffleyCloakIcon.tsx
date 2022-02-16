import { FunctionComponent } from "react"
import BaseIcon from "./parts/BaseIcon"
import CloakingDevice from "./parts/CloakingDevice"
interface TuffleyCloakProps {}

const TuffleyCloakIcon: FunctionComponent<TuffleyCloakProps> = () => {
  return (
    <BaseIcon>
      <CloakingDevice rotate={90} />
    </BaseIcon>
  )
}

export default TuffleyCloakIcon
