import { FC } from "react"
import { Paper, Container, Text, Title } from "@mantine/core"
import {
  calculateHullArray,
  calculateShipValue,
  printNumberArray,
  arraySum,
} from "../../logic/helpers"
import { calculateMass } from "../../logic/massCalculation"
import GunboatRacks from "./GunboatRacks"
import FighterRacks from "./FighterRacks"
import Systems from "./Systems"
import Fighters from "./Fighters"

interface ShipDataProps {
  ship: any
}
const ShipData: FC<ShipDataProps> = ({ ship }) => {
  return (
    <Container>
      <Paper my={16} padding='md' shadow='sm' withBorder>
        <Title order={2}>{ship.name}</Title>
        <Text>
          Mass: {ship.mass} ({ship.mass - calculateMass(ship)} left)
        </Text>
        <Text>Points: {calculateShipValue(ship)}</Text>
        <Text>
          Hull: {ship.hull} in {ship.hullRows} rows (
          {printNumberArray(calculateHullArray(ship.hull, ship.hullRows))})
        </Text>
        {arraySum(ship.armor) > 0 && (
          <Text>
            Armor: {arraySum(ship.armor)} in {ship.armor.length} rows (
            {printNumberArray(ship.armor)})
          </Text>
        )}
        {arraySum(ship.regenArmor) > 0 && (
          <Text>
            Regen. armor: {arraySum(ship.regenArmor)} in{" "}
            {ship.regenArmor.length} rows ({printNumberArray(ship.regenArmor)})
          </Text>
        )}
        {ship.stealthHull !== "none" && (
          <Text>Stealth hull lvl {ship.stealthHull === "lvl2" ? 2 : 1}</Text>
        )}
        <Text>
          {ship.driveType === "standard"
            ? `Standard drive ${ship.drive}`
            : `Advanced drive ${ship.drive}`}
        </Text>
        {ship.ftlDrive !== "none" && (
          <Text>
            {ship.ftlDrive === "standard" ? "Standard FTL" : "Advanced FTL"}
          </Text>
        )}
        {ship.streamlining !== "none" && (
          <Text>
            {ship.streamlining == "partial"
              ? "Partial streamlining"
              : "Full streamlining"}
          </Text>
        )}
        {ship.hangars > 0 && (
          <Text>
            {`${ship.hangars} hangar${ship.hangars > 1 ? "s" : ""} &
            ${ship.launchTubes} launch tube${ship.launchTubes > 1 ? "s" : ""} ${
              ship.launchCatapults ? "with catapults" : ""
            }`}
          </Text>
        )}
        <FighterRacks ship={ship} />
        <GunboatRacks ship={ship} />
        <Fighters ship={ship} />
        <Systems ship={ship} />
      </Paper>
    </Container>
  )
}
export default ShipData
