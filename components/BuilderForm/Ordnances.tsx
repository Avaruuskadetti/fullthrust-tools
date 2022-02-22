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
import OrdnanceBuilder from "./Ordnance"
import {
  ordnanceBlueprints,
  ordnance,
  ordnanceBlueprint,
  getOrdnanceBlueprint,
  missileVariant,
  salvo,
} from "../../resources/ordnance"
interface ordnancesProps {
  ship: any
  setShip: any
}
const Ordnances: FC<ordnancesProps> = ({ ship, setShip }) => {
  const [currentOrdnance, setCurrentOrdnance] = useState("")

  const getID = () =>
    ship.ordnance.length > 0
      ? Math.max(...ship.ordnance.map((o: ordnance) => o.id)) + 1
      : 1

  const addOrdnance = () => {
    if (currentOrdnance) {
      const bp = getOrdnanceBlueprint(currentOrdnance)
      const initialVariant = !bp.magazine ? bp.variants[0] : undefined
      const initialMagazine = bp.magazine
        ? bp.variants.map((variant: missileVariant): salvo => {
            return { value: variant.value, label: variant.label, count: 0 }
          })
        : undefined
      const newOrdnance: ordnance = {
        id: getID(),
        value: bp.value,
        label: bp.label,
        count: 1,
        variant: initialVariant,
        magazine: initialMagazine,
      }
      setShip({ ...ship, ordnance: [...ship.ordnance, newOrdnance] })
    }
  }

  const editOrdnance = (newO: ordnance) => {
    const newOrdnance = ship.ordnance.map((o: ordnance) =>
      o.id === newO.id ? newO : o
    )
    setShip({ ...ship, ordnance: newOrdnance })
  }

  const ordnanceTypeData = ordnanceBlueprints
    .map((bp: ordnanceBlueprint) => {
      return { value: bp.value, label: bp.label }
    })
    .sort((a, b) => (a.label < b.label ? -1 : 1))

  const getDeleteOrdnance = (id: number) => () => {
    const newOrdnance = ship.ordnance.filter((o: ordnance) => o.id !== id)
    setShip({ ...ship, ordnance: newOrdnance })
  }

  return (
    <Paper my={16} padding='md' withBorder shadow='sm'>
      <Title order={3}>Ordnance</Title>
      <Group mt={8} noWrap align='end'>
        <Select
          searchable
          clearable
          sx={{ width: "100%" }}
          placeholder='Type to search'
          data={ordnanceTypeData}
          label='Select ordnance type'
          value={currentOrdnance}
          onChange={(value: string) => setCurrentOrdnance(value)}
        />
        <Button onClick={addOrdnance}>Add</Button>
      </Group>
      <Divider mt={16} mb={16} />
      {ship.ordnance.map((ordnance: ordnance) => (
        <OrdnanceBuilder
          key={`${ordnance.value}-${ordnance.id}`}
          ordnance={ordnance}
          blueprint={getOrdnanceBlueprint(ordnance.value)}
          setOrdnance={editOrdnance}
          deleteOrdnance={getDeleteOrdnance(ordnance.id)}
        />
      ))}
    </Paper>
  )
}
export default Ordnances
