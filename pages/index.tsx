import type { NextPage } from "next"
import { useState } from "react"
import {
  Title,
  Text,
  Anchor,
  AppShell,
  Navbar,
  Header,
  useMantineTheme,
  MediaQuery,
  Burger,
  SimpleGrid,
  Container,
  Grid,
} from "@mantine/core"
import BuilderForm from "../components/BuilderForm"
import ShipData from "../components/ShipData"

const HomePage: NextPage = () => {
  const [open, setOpen] = useState(false)
  const theme = useMantineTheme()

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
  })

  return (
    <AppShell
      fixed
      navbar={
        <Navbar
          hiddenBreakpoint='sm'
          hidden={!open}
          width={{ sm: 300, lg: 400 }}
          height={500}
          padding='md'
        >
          <Text>This is navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} padding='md'>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger
                opened={open}
                onClick={() => setOpen((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Text sx={{ fontWeight: 600 }} color={theme.colors.gray[7]}>
              Full Thrust Fleet Tool
            </Text>
          </div>
        </Header>
      }
    >
      <Grid style={{ width: "100%" }}>
        <Grid.Col span={12} md={6}>
          <BuilderForm ship={ship} setShip={setShip} />
        </Grid.Col>

        <ShipData ship={ship} />
      </Grid>
    </AppShell>
  )
}
export default HomePage
