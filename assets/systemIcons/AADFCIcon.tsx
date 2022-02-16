import BaseIcon from "./parts/BaseIcon"
import Adfc from "./parts/Adfc"
import SmallRectangle from "./parts/SmallRectangle"

const AADFCIcon = () => (
  <BaseIcon>
    <SmallRectangle />
    <Adfc m={+62} size={90} />
    <Adfc m={-62} size={90} />
  </BaseIcon>
)
export default AADFCIcon
