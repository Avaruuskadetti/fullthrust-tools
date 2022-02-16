import BaseIcon from "./parts/BaseIcon"
import Diamond from "./parts/Diamond"
import ScreenArcs from "./parts/ScreenArcs"

const StealthFieldIcon = () => (
  <BaseIcon>
    <ScreenArcs dashed />
    <Diamond size={140} m={-80} />
  </BaseIcon>
)
export default StealthFieldIcon
