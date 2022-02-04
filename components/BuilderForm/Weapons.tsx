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

import Weapon from "./Weapon"
import {
  weapon,
  weaponBlueprints,
  getWeaponBlueprint,
  weaponBlueprint,
} from "../../resources/weapons"

interface WeaponsProps {
  ship: any
  setShip: any
}
const Weapons: FC<WeaponsProps> = ({ ship, setShip }) => {
  const [currentWeapon, setCurrentWeapon] = useState("")

  const getID = () =>
    ship.weapons.length > 0
      ? Math.max(...ship.weapons.map((w: weapon) => w.id)) + 1
      : 1

  const addWeapon = () => {
    if (currentWeapon) {
      const bp = getWeaponBlueprint(currentWeapon)
      const initialClass = bp.classes[0]
      const initialArcs = initialClass.arcs[0]
      const initialVariant = bp.variants && bp.variants[0]
      const newWeapon: weapon = {
        id: getID(),
        value: bp.value,
        label: bp.label,
        count: 1,
        class: initialClass.value,
        arcs: initialArcs,
        variant: initialVariant?.value,
      }
      setShip({ ...ship, weapons: [...ship.weapons, newWeapon] })
    }
  }
  const editWeapon = (newWeapon: weapon) => {
    const newWeapons = ship.weapons.map((w: weapon) =>
      w.id === newWeapon.id ? newWeapon : w
    )
    setShip({ ...ship, weapons: newWeapons })
  }
  const getDeleteWeapon = (id: number) => () => {
    const newWeapons = ship.weapons.filter((w: weapon) => w.id !== id)
    setShip({ ...ship, weapons: newWeapons })
  }

  const weaponTypeData = weaponBlueprints
    .map((bp: weaponBlueprint) => {
      return { value: bp.value, label: bp.label }
    })
    .sort((a, b) => (a.label < b.label ? -1 : 1))
  return (
    <Paper my={16} padding='md' withBorder shadow='sm'>
      <Title order={3}>Weapons</Title>
      <Group mt={8} noWrap align='end'>
        <Select
          searchable
          clearable
          style={{ width: "100%" }}
          placeholder='Type to search'
          data={weaponTypeData}
          label='Select weapon type'
          value={currentWeapon}
          onChange={(value: string) => setCurrentWeapon(value)}
        />
        <Button onClick={addWeapon}>Add</Button>
      </Group>
      <Divider mt={16} mb={16} />
      {ship.weapons.map((weapon: weapon) => (
        <Weapon
          key={`${weapon.value}-${weapon.id}`}
          weapon={weapon}
          blueprint={getWeaponBlueprint(weapon.value)}
          ship={ship}
          setWeapon={editWeapon}
          deleteWeapon={getDeleteWeapon(weapon.id)}
        />
      ))}
    </Paper>
  )
}
export default Weapons
