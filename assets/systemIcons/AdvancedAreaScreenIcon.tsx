import AdvAreaScreenRays from "./parts/AdvAreaScreenRays"
import BaseIcon from "./parts/BaseIcon"
import Diamond from "./parts/Diamond"

const AdvancedAreaScreenIcon = () => (
  <BaseIcon>
    <AdvAreaScreenRays diamondWidth={140} />
    <Diamond size={140} />
  </BaseIcon>
)
export default AdvancedAreaScreenIcon
