import { FC, useState } from "react"
import {
  Paper,
  NumberInput,
  Text,
  Title,
  Button,
  Select,
  Group,
  Divider,
} from "@mantine/core"
import {
  spinalmountBlueprints,
  spinalmount,
  spinalmountBlueprint,
  getSpinalBlueprint,
  spinalmountClasses,
  spinalLimits,
} from "../../resources/spinalMounts"
import { ship } from "../../resources/ship"
import SpinalMountBuilder from "./SpinalMount"

interface SpinalMountsProps {
  ship: ship
  setShip: any
}

const SpinalMounts: FC<SpinalMountsProps> = ({ ship, setShip }) => {
  const [current, setCurrent] = useState("")

  const getID = () =>
    ship.spinalMounts.length > 0
      ? Math.max(...ship.spinalMounts.map((sm: spinalmount) => sm.id)) + 1
      : 1

  const addSpinal = () => {
    if (current) {
      const bp = getSpinalBlueprint(current)
      const newSpinal = {
        id: getID(),
        value: bp.value,
        label: bp.label,
        count: 1,
        mass: parseInt(spinalmountClasses[0].value),
      }
      setShip({
        ...ship,
        spinalMounts: [...ship.spinalMounts, newSpinal],
      })
    }
  }
  const editSpinal = (newSpinal: spinalmount) => {
    const newSpinals = ship.spinalMounts.map((sm: spinalmount) =>
      sm.id === newSpinal.id ? newSpinal : sm
    )
    const isOverMassLimit =
      newSpinals.reduce(
        (acc: number, curr: spinalmount) => acc + curr.mass * curr.count,
        0
      ) >
      spinalLimits.maxPerMassUnit *
        Math.floor(ship.mass / spinalLimits.massUnit + 1)
    if (!isOverMassLimit) {
      setShip({ ...ship, spinalMounts: newSpinals })
      return true
    }
    return false
  }
  const getDeleteSpinal = (id: number) => () => {
    const newSpinals = ship.spinalMounts.filter(
      (sm: spinalmount) => sm.id !== id
    )
    setShip({ ...ship, spinalMounts: newSpinals })
  }
  const spinalTypeData = spinalmountBlueprints.map(
    (bp: spinalmountBlueprint) => ({ value: bp.value, label: bp.label })
  )

  return (
    <Paper my={16} padding='md' withBorder shadow='sm'>
      <Title order={3}>Spinal Mounts</Title>
      <Group mt={8} noWrap align='end'>
        <Select
          searchable
          clearable
          style={{ width: "100%" }}
          placeholder='Type to search'
          data={spinalTypeData}
          label='Select weapon type'
          value={current}
          onChange={(value: string) => setCurrent(value)}
        />
        <Button onClick={addSpinal}>Add</Button>
      </Group>
      <Divider mt={16} />
      {ship.spinalMounts.map((sm: spinalmount) => (
        <SpinalMountBuilder
          key={sm.id}
          spinalmount={sm}
          blueprint={getSpinalBlueprint(sm.value)}
          setSpinalmount={editSpinal}
          deleteSpinalmount={getDeleteSpinal(sm.id)}
        />
      ))}
    </Paper>
  )
}
export default SpinalMounts
