import AreaScreenRays from "./parts/AreaScreenRays"
import BaseIcon from "./parts/BaseIcon"
import ScreenCircle from "./parts/ScreenCircle"

const AreaScreenIcon = () => (
  <BaseIcon>
    <AreaScreenRays dotRadius={60} />
    <ScreenCircle centered />
  </BaseIcon>
)
export default AreaScreenIcon
