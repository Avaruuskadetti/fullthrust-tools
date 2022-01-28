import { FC } from "react"
import { Text } from "@mantine/core"
interface GunboatRacksProps {
  ship: any
}
const GunboatRacks: FC<GunboatRacksProps> = ({ ship }) =>
  ship.gunboatRacks > 0 ? (
    <Text>
      {ship.gunboatRacks} gunboat rack{ship.gunboatRacks > 1 ? "s" : ""}
    </Text>
  ) : (
    <></>
  )
export default GunboatRacks
