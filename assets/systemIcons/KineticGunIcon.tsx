import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import KineticGun from "./parts/KineticGun"
import InnerHexagon from "./parts/InnerHexagon"

interface props {
  arcs: number[]
  value: string
  variant?: string
}
const KineticGunIcon: FC<props> = ({ arcs, variant, value }) => (
  <BaseIcon
    value={value}
    textColor={variant && variant.toLowerCase() === "l" ? "white" : "black"}
  >
    <KineticGun
      arcs={arcs}
      fill={variant && variant.toLocaleLowerCase() === "l" ? "black" : "white"}
    />
    {variant && variant.toLowerCase() === "m" && (
      <InnerHexagon stroke='black' />
    )}
  </BaseIcon>
)
export default KineticGunIcon
