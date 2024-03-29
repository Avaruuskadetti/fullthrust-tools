import { useState } from "react"
import {
  getPossibleOrders,
  getPossiblePositions,
  targetOnArc,
  beamRoll,
} from "../logic/sim/functions"
import {
  Paper,
  Button,
  Title,
  Text,
  Grid,
  NumberInput,
  Switch,
  Box,
} from "@mantine/core"
import { simShip, position } from "../logic/sim/interfaces"
import HitSim from "../components/sim/HitSim"
import styles from "./sim.module.css"

const testShip: simShip = {
  position: { x: 0, y: 0, facing: 1 },
  drive: 4,
  velocity: 4,
}

const getMapRotation = (facing: number) => {
  switch (facing) {
    case 1:
      return styles.twelve
    case 2:
      return styles.one
    case 3:
      return styles.two
    case 4:
      return styles.three
    case 5:
      return styles.four
    case 6:
      return styles.five
    case 7:
      return styles.six
    case 8:
      return styles.seven
    case 9:
      return styles.eight
    case 10:
      return styles.nine
    case 11:
      return styles.ten
    case 12:
      return styles.eleven
  }
}

const Sim = () => {
  const [ship, setShip] = useState(testShip)
  const [roundCourseChangeUp, setRoundCourseChangeUp] = useState(false)

  return (
    <div>
      <HitSim />
      <Paper my='md' mr='md' padding='md' withBorder shadow='sm'>
        <Grid>
          <Grid.Col span={6}>
            <Title order={2}>Ship maneuver simulator</Title>
            <Text>
              This simulator calculates all possible future positions for a ship
              with determined velocity and drive after one maneuver.
            </Text>
            <NumberInput
              label='Velocity'
              min={0}
              value={ship.velocity}
              onChange={(value) =>
                setShip(
                  (prev): simShip => ({
                    ...prev,
                    velocity: value ? value : prev.velocity,
                  })
                )
              }
            />
            <NumberInput
              label='Drive'
              min={0}
              value={ship.drive}
              onChange={(value) =>
                setShip(
                  (prev): simShip => ({
                    ...prev,
                    drive: value ? value : prev.drive,
                  })
                )
              }
            />
            <Switch
              label='Round maximum course change up'
              my='sm'
              checked={roundCourseChangeUp}
              onChange={(event) =>
                setRoundCourseChangeUp(event.currentTarget.checked)
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: "scaleY(-1)",
              }}
            >
              <Box
                sx={(theme) => ({
                  border: `1px solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[8]
                      : theme.colors.gray[3]
                  }`,
                })}
              >
                <svg width='100%' height='100%' viewBox='0 0 30 23'>
                  {getPossiblePositions(ship, roundCourseChangeUp).map(
                    (p, index) => (
                      <image
                        key={index}
                        href='future.png'
                        x={15 + p.x - 0.25}
                        y={7 + p.y - 0.25}
                        width='0.8'
                        height='0.8'
                        className={getMapRotation(p.facing) + ""}
                        style={{ opacity: 0.3 }}
                      />
                    )
                  )}
                  <image
                    href='ship.png'
                    x={15 + ship.position.x - 0.25}
                    y={7 + ship.position.y - 0.25}
                    width='0.8'
                    height='0.8'
                    className={getMapRotation(ship.position.facing)}
                  />
                </svg>
              </Box>
            </div>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  )
}
export default Sim
