import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import EcmRays from "./parts/EcmRays"
import ScreenCircle from "./parts/ScreenCircle"
interface props {
  fill?: string
  stroke?: string
}

const ECMIcon: FC<props> = ({ fill, stroke }) => (
  <BaseIcon>
    <EcmRays fill={fill ? fill : "white"} stroke={stroke ? stroke : "black"} />
    <ScreenCircle
      centered
      radius={36}
      fill={fill ? fill : "white"}
      stroke='black'
    />
  </BaseIcon>
)
export default ECMIcon
