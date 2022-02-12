import {
  NumberInput,
  Paper,
  Select,
  Group,
  Grid,
  Divider,
  Title,
  Button,
  Text,
  Table,
  SimpleGrid,
} from "@mantine/core"
import { useState } from "react"
import Armor from "../BuilderForm/Armor"
import {
  simulateAverageDamage,
  simulateRoundsToKill,
} from "../../logic/sim/functions"
import BarGraph from "./BarGraph"
import { armorRow, simulationShip } from "../../logic/sim/interfaces"
import { calculateHullArray } from "../../logic/helpers"

interface datapoint {
  name: string
  value: number
}
interface data {
  description: string
  mean: number
  median: number
  mode: number
  min: number
  max: number
  data: datapoint[]
}
const defaultData: data = {
  description: "",
  mean: 0,
  median: 0,
  mode: 0,
  min: 0,
  max: 0,
  data: [{ name: "0", value: 0 }],
}
const defaultShip: simulationShip = {
  armor: [],
  hull: [5, 5, 5, 5],
  screen: 0,
}

const HitSim = () => {
  const [dice, setDice] = useState(10)
  const [target, setTarget] = useState(defaultShip)
  const [results, setResults] = useState(defaultData)
  const [rounds, setRounds] = useState(100000)
  const [mode, setMode] = useState("avgDmg")
  const [hasRun, setHasRun] = useState(false)

  const addArmorRow = () => {
    let newArmor: armorRow[] = [
      ...target.armor,
      { armor: 0, armorLeft: 0, regen: 0, regenLeft: 0, regenLost: 0 },
    ]
    setTarget({ ...target, armor: newArmor })
  }
  const removeArmorRow = () => {
    let newArmor: armorRow[] = [...target.armor]
    newArmor.pop()
    setTarget({ ...target, armor: newArmor })
  }
  // to connect with different ship solution in builder
  const setArmor = (armorArray: number[]) => {
    const newArmor = armorArray.map((a, i) => ({
      ...target.armor[i],
      armor: a,
      armorLeft: a,
    }))
    setTarget({ ...target, armor: newArmor })
  }
  const setRegenArmor = (regenArray: number[]) => {
    const newArmor = regenArray.map((a, i) => ({
      ...target.armor[i],
      regen: a,
      regenLeft: a,
    }))
    setTarget({ ...target, armor: newArmor })
  }

  return (
    <Paper mr='md' padding='md' withBorder shadow='sm'>
      <Title order={2}>Beam hit simulator</Title>
      <Text my='sm'>
        Simulate beam hits against a variety of ship designs over thousands of
        iterations. In <strong>average damage mode</strong> the simulator counts
        the average damage done in a single volley. In{" "}
        <strong>rounds to kill mode</strong> the simulation determines average
        life span of a ship against beams. Other modes and weapons are under
        development.
      </Text>
      <Text my='sm'>
        This simulation is rather performance-intensive. If you experience
        freezing, reduce the number of iterations.
      </Text>
      <Divider my='md' />
      <Grid>
        <Grid.Col span={4}>
          <Title order={3}>Configuration</Title>
          <Group noWrap>
            <NumberInput
              min={0}
              label='Number of dice'
              value={dice}
              onChange={(value: number) => setDice(value)}
            />
            <NumberInput
              min={1}
              max={500000}
              step={1000}
              label='Sim rounds'
              value={rounds}
              onChange={(value: number) => setRounds(value)}
            />
          </Group>
          <Select
            label='Mode'
            data={[
              { value: "avgDmg", label: "Average damage" },
              { value: "roundsToKill", label: "Rounds to kill" },
            ]}
            value={mode}
            onChange={(value) => setMode(value as string)}
          />
          <Divider mt='md' mb='xs' />
          <Group>
            <Select
              label='Target screen'
              data={[
                { value: "0", label: "no screen" },
                { value: "1", label: "level 1" },
                { value: "2", label: "level 2" },
              ]}
              value={target.screen.toString()}
              onChange={(value: string) =>
                setTarget({ ...target, screen: parseInt(value) })
              }
            />
            <Group noWrap>
              <NumberInput
                label='Hull boxes'
                min={1}
                value={target.hull.reduce((a, b) => a + b, 0)}
                onChange={(value: number) => {
                  setTarget((prev: simulationShip) => ({
                    ...prev,
                    hull: calculateHullArray(value, prev.hull.length),
                  }))
                }}
              />
              <Select
                label='Hull rows'
                data={[
                  { value: "6", label: "6 rows" },
                  { value: "5", label: "5 rows" },
                  { value: "4", label: "4 rows" },
                  { value: "3", label: "3 rows" },
                ]}
                value={target.hull.length.toString()}
                onChange={(value: string) => {
                  setTarget((prev: simulationShip) => ({
                    ...prev,
                    hull: calculateHullArray(
                      prev.hull.reduce((a, b) => a + b, 0),
                      parseInt(value)
                    ),
                  }))
                }}
              />
            </Group>
            <Armor
              addArmorRow={addArmorRow}
              removeArmorRow={removeArmorRow}
              armor={target.armor.map((row) => row.armor)}
              setArmor={(a: number[]) => setArmor(a)}
              regenArmor={target.armor.map((row) => row.regen)}
              setRegenArmor={(a: number[]) => setRegenArmor(a)}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={8} style={{ paddingLeft: "2rem" }}>
          <Title order={3}>Simulation results</Title>
          {mode === "roundsToKill" && (
            <Text my='sm'>
              Rounds to kill mode simulates shots from determined number of
              beams to target ship in consecutive rounds until the target is
              destroyed. Currently the algorithm doesn&apos;t simulate lost
              systems, damage control or core system failures. Regenerative
              armor is already simulated.
            </Text>
          )}
          {mode === "avgDmg" && (
            <Text my='sm'>
              Average damage mode simulates damage from determined number of
              beams against selected level of screen. Other ship settings such
              as hull and armor don&apos;t have effect on this simulation.
            </Text>
          )}
          <Button
            onClick={() => {
              setHasRun(true)
              switch (mode) {
                case "avgDmg":
                  setResults(simulateAverageDamage(target, dice, rounds))
                  break
                case "roundsToKill":
                  setResults(simulateRoundsToKill(target, dice, rounds))
                  break
              }
            }}
          >
            Simulate
          </Button>
          <Divider my='md' />
          {hasRun && (
            <>
              <Text weight={600}>{results.description}</Text>
              <SimpleGrid cols={2}>
                <Table>
                  <tbody>
                    <tr>
                      <td>Mean</td>
                      <td>{results.mean && results.mean.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Median</td>
                      <td>{results.median && results.median}</td>
                    </tr>
                    <tr>
                      <td>Mode</td>
                      <td>{results.mode && results.mode}</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>{results.min && results.min}</td>
                    </tr>
                    <tr>
                      <td>Max</td>
                      <td>{results.max && results.max}</td>
                    </tr>
                  </tbody>
                </Table>
                <BarGraph data={results.data} unit='dmg' />
              </SimpleGrid>
            </>
          )}
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
export default HitSim
