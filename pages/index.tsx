import type { NextPage } from "next"
import { useState } from "react"
import { Grid } from "@mantine/core"
import BuilderForm from "../components/BuilderForm"
import ShipData from "../components/ShipData"
import { ship } from "../resources/ship"

const baseShip: ship = {
  id: 1,
  name: "",
  mass: 40,
  hull: 10,
  hullRows: 4,
  armor: [],
  regenArmor: [],
  stealthHull: "none",
  drive: 4,
  driveType: "standard",
  ftlDrive: "standard",
  streamlining: "none",
  hangars: 0,
  launchTubes: 0,
  launchCatapults: false,
  fighterRacks: 0,
  gunboatRacks: 0,
  fighters: [],
  gunboats: [],
  cargoSpaces: 0,
  passengerSpaces: 0,
  marineSpaces: 0,
  extraDCP: 0,
  marines: 0,
  flawed: false,
  systems: [],
  weapons: [],
  ordnance: [],
  spinalMounts: [],
}

const HomePage: NextPage = () => {
  const [ships, setShips] = useState<ship[]>([{ ...baseShip }])

  const getNextId = () => Math.max(...ships.map((s: ship) => s.id)) + 1

  const addShip = () => {
    setShips([...ships, { ...baseShip, id: getNextId() }])
  }
  const editShip = (newShip: ship) => {
    setShips((prev: ship[]) =>
      prev.map((oldShip: ship) =>
        oldShip.id === newShip.id ? newShip : oldShip
      )
    )
  }
  const getShip = (id: number): ship => {
    const hits: ship[] = ships.filter((s: ship) => s.id === id)
    return hits.length > 0 ? hits[0] : baseShip
  }

  return (
    <Grid style={{ width: "100%" }}>
      <Grid.Col span={12} md={6}>
        <BuilderForm ship={getShip(1)} setShip={editShip} />
      </Grid.Col>
      <ShipData ship={getShip(1)} ships={ships} />
    </Grid>
  )
}
export default HomePage
