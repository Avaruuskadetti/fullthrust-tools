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

const testShip: simShip = {
  position: { x: 0, y: 0, facing: 1 },
  drive: 4,
  velocity: 4,
}

const getMapRotation = (facing: number) => ({
  transform: `rotate(${-(facing - 1) * 60 - 180}deg)`,
  transformBox: "fill-box",
  transformOrigin: "center",
})

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
                        style={{ ...getMapRotation(p.facing), opacity: 0.3 }}
                      />
                    )
                  )}
                  <image
                    href='ship.png'
                    x={15 + ship.position.x - 0.25}
                    y={7 + ship.position.y - 0.25}
                    width='0.8'
                    height='0.8'
                    style={{ ...getMapRotation(ship.position.facing) }}
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
