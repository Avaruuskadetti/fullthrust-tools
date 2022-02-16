import { FunctionComponent } from "react"
import BaseIcon from "./parts/BaseIcon"
import Scattergun from "./parts/Scattergun"

interface Props {}

const ScattergunIcon: FunctionComponent<Props> = () => {
  return (
    <BaseIcon>
      <Scattergun />
    </BaseIcon>
  )
}

export default ScattergunIcon
