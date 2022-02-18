import { FC, useRef, useState } from "react"

import {
  Paper,
  Text,
  Title,
  Badge,
  Group,
  Button,
  Divider,
} from "@mantine/core"
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
import OrdnanceData from "./Ordnance"
import SpinalMountsData from "./SpinalMounts"
import CrewData from "./Crew"
import ClipboardIcon from "../../assets/ClipboardIcon"
import { ship } from "../../resources/ship"
import CargoData from "./Cargo"
import { spinalmount } from "../../resources/spinalMounts"

interface ShipDataViewProps {
  ship: ship
  withPaper?: boolean
}
const ShipDataView: FC<ShipDataViewProps> = ({ ship, withPaper = false }) => {
  const [copySuccess, setCopySuccess] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = () => {
    if (textRef.current !== null) {
      navigator.clipboard.writeText(textRef.current.innerText)
      setCopySuccess(true)
    }
  }

  const warnings = {
    spinal:
      ship.spinalMounts.reduce(
        (acc: number, cur: spinalmount) => acc + cur.mass * cur.count,
        0
      ) >
      16 * (Math.floor((ship.mass - 1) / 50) + 1),
    mass: ship.mass - calculateMass(ship) < 0,
  }
  const hasWarnings = () =>
    Object.keys(warnings).reduce((a, c) => a || warnings[c], false)

  return (
    <Paper
      my={16}
      padding={withPaper ? "md" : 0}
      shadow={withPaper ? "sm" : ""}
      withBorder={withPaper ? true : false}
    >
      <Group my='sm'>
        <Badge
          variant='filled'
          color={ship.mass - calculateMass(ship) < 0 ? "red" : "blue"}
        >
          {ship.mass - calculateMass(ship)} mass left
        </Badge>
        <Badge variant='filled' color='green'>
          NPV {calculateShipValue(ship)}
        </Badge>
        <Badge variant='filled' color='orange'>
          CPV {calculateShipValue(ship, true)}
        </Badge>
      </Group>
      {hasWarnings() && (
        <Group my='sm'>
          {warnings.spinal && (
            <Badge variant='filled' color='red'>
              Too many spinals!
            </Badge>
          )}
          {warnings.mass && (
            <Badge variant='filled' color='red'>
              Overmass!
            </Badge>
          )}
        </Group>
      )}
      <Divider my='sm' />
      <div ref={textRef}>
        {withPaper && <Title order={2}>{ship.name}</Title>}
        <Group>
          <Text>Mass: {ship.mass}</Text>
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
        <CargoData ship={ship} />
        <CrewData ship={ship} />
        <Systems ship={ship} />
        <WeaponsData ship={ship} />
        <OrdnanceData ship={ship} />
        <SpinalMountsData ship={ship} />
      </div>
      <Divider my='sm' />
      <Button my='sm' onClick={copyToClipboard} leftIcon={<ClipboardIcon />}>
        Copy to clipboard
      </Button>
      {copySuccess && <Text>Copied!</Text>}
    </Paper>
  )
}
export default ShipDataView
