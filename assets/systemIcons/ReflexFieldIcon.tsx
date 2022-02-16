import { FunctionComponent } from "react"
import BaseIcon from "./parts/BaseIcon"
import ReflexRays from "./parts/ReflexRays"
import ScreenCircle from "./parts/ScreenCircle"

interface ReflexFieldIconProps {}

const ReflexFieldIcon: FunctionComponent<ReflexFieldIconProps> = ({}) => {
  const innerRadius = 100
  const outerRadius = 170
  return (
    <BaseIcon>
      <ReflexRays innerRadius={innerRadius} outerRadius={outerRadius} />
      <ScreenCircle centered radius={innerRadius} />
    </BaseIcon>
  )
}

export default ReflexFieldIcon
