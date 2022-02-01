import { FC } from "react"
import { Text } from "@mantine/core"
import { getWeaponBlueprint, weapon } from "../../resources/weapons"
interface WeaponsDataProps {
  ship: any
}
const WeaponsData: FC<WeaponsDataProps> = ({ ship }) => {
  const mapping = (w: weapon) => {
    const bp = getWeaponBlueprint(w.value)
    if (w.count) {
      return (
        <Text key={w.label}>
          {`${w.count}x ${
            bp.classes && bp.classes?.length > 1 ? `Class ${w.class} ` : ""
          }${w.label}${
            w.arcs ? ` (${w.arcs} arc${parseInt(w.arcs) > 1 ? "s" : ""})` : ""
          }${w.variant ? " [variant: " + w.variant + "]" : ""}`}
        </Text>
      )
    } else {
      return <Text key={w.label}>{w.label}</Text>
    }
  }
  return ship.weapons.length > 0 ? ship.weapons.map(mapping) : <></>
}

export default WeaponsData
