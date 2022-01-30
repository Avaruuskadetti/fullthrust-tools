import { FC } from "react"

import { Paper, Text, Title, Badge, Group } from "@mantine/core"
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
import WeaponsData from "./Weapons"

interface ShipDataViewProps {
  ship: any
  withPaper?: boolean
}
const ShipDataView: FC<ShipDataViewProps> = ({ ship, withPaper = false }) => {
  return (
    <Paper
      my={16}
      padding={withPaper ? "md" : 0}
      shadow={withPaper ? "sm" : ""}
      withBorder={withPaper ? true : false}
      style={{
        outline: ship.mass - calculateMass(ship) < 0 ? "3px solid red" : "",
      }}
    >
      {withPaper && <Title order={2}>{ship.name}</Title>}
      <Group>
        <Text>Mass: {ship.mass}</Text>
        <Badge
          variant='filled'
          color={ship.mass - calculateMass(ship) < 0 ? "red" : "blue"}
          style={{ userSelect: "none" }}
        >
          {ship.mass - calculateMass(ship)} left
        </Badge>
      </Group>
      <Text>Points: {calculateShipValue(ship)}</Text>
      <Text>CPV: {calculateShipValue(ship, true)}</Text>
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
          Regen. armor: {arraySum(ship.regenArmor)} in {ship.regenArmor.length}{" "}
          rows ({printNumberArray(ship.regenArmor)})
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
      <WeaponsData ship={ship} />
    </Paper>
  )
}
export default ShipDataView
