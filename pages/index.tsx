import type { NextPage } from "next"
import { useState } from "react"
import { Grid } from "@mantine/core"
import BuilderForm from "../components/BuilderForm"
import ShipData from "../components/ShipData"

const HomePage: NextPage = () => {
  const [open, setOpen] = useState(false)

  const [ship, setShip] = useState({
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
    cargoSpaces: 0,
    passengerSpaces: 0,
    marineSpaces: 0,
    extraDCP: 0,
    marines: 0,
    flawed: false,
    systems: [],
    weapons: [],
    ordnance: [],
  })

  return (
    <Grid style={{ width: "100%" }}>
      <Grid.Col span={12} md={6}>
        <BuilderForm ship={ship} setShip={setShip} />
      </Grid.Col>
      <ShipData ship={ship} />
    </Grid>
  )
}
export default HomePage
