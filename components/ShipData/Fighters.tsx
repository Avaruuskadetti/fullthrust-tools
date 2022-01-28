import { FC } from "react"
import { Text } from "@mantine/core"
import { printFighter } from "../../logic/helpers"
interface FightersProps {
  ship: any
}
const Fighters: FC<FightersProps> = ({ ship }) =>
  ship.fighters.length > 0 ? (
    <Text>{ship.fighters.map((fighter: any) => printFighter(fighter))}</Text>
  ) : (
    <></>
  )
export default Fighters
