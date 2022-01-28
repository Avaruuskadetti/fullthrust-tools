import { FC } from "react"
import { Text } from "@mantine/core"
interface FighterRacksProps {
  ship: any
}
const GunboatRacks: FC<FighterRacksProps> = ({ ship }) =>
  ship.fighterRacks > 0 ? (
    <Text>
      {ship.fighterRacks} fighter rack{ship.fighterRacks > 1 ? "s" : ""}
    </Text>
  ) : (
    <></>
  )
export default GunboatRacks
