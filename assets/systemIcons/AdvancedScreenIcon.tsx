import BaseIcon from "./parts/BaseIcon"
import Diamond from "./parts/Diamond"
import DiamondArcs from "./parts/DiamondArcs"

const AdvancedScreenIcon = () => (
  <BaseIcon>
    <DiamondArcs />
    <Diamond size={140} m={-105} />
  </BaseIcon>
)
export default AdvancedScreenIcon
