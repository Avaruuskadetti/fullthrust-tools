import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import Checkbox from "./parts/Checkbox"
import Circle from "./parts/Circle"
import CloakingDevice from "./parts/CloakingDevice"
import Rectangle from "./parts/Rectangle"

interface props {
  fillLeft?: boolean
  fillRight?: boolean
}
const CloakingFieldIcon: FC<props> = ({}) => {
  return (
    <BaseIcon>
      <Rectangle w={360} h={500} />
      <CloakingDevice py={-80} />
      <Checkbox px={-75} py={150} size={110} />
      <Checkbox px={+75} py={150} size={110} />
    </BaseIcon>
  )
}
export default CloakingFieldIcon
