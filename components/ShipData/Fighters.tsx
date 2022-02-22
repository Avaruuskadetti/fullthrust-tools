import { FC } from "react"
import { Text } from "@mantine/core"
import { printFighter } from "../../logic/helpers"
import { fighter } from "../../resources/fighters"
import { ship } from "../../resources/ship"
interface FightersProps {
  ship: ship
}
const Fighters: FC<FightersProps> = ({ ship }) =>
  ship.fighters.length > 0 ? (
    <>
      {ship.fighters.map((fighter: fighter) => (
        <Text key={fighter.id}>{printFighter(fighter)}</Text>
      ))}
    </>
  ) : (
    <></>
  )
export default Fighters
