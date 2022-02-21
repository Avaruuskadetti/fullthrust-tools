import { Group, InputWrapper, Badge, Divider, Button } from "@mantine/core"
import { FunctionComponent } from "react"
import { gunboat, gunboats } from "../../resources/gunboats"
import { ship } from "../../resources/ship"
import GunboatBuilder from "./Gunboat"
interface GunboatsProps {
  ship: ship
  setShip: (s: ship) => void
}

const Gunboats: FunctionComponent<GunboatsProps> = ({ ship, setShip }) => {
  const spaceLeft =
    ship.gunboatRacks -
    ship.gunboats.reduce((a: number, c: gunboat) => a + c.groups, 0)

  const getID = () =>
    ship.gunboats.length > 0
      ? Math.max(...ship.gunboats.map((g: gunboat) => g.id)) + 1
      : 1

  const addGunboat = () => {
    const newGunboat = { id: getID(), groups: 1, type: "", mods: [] }
    if (spaceLeft) {
      setShip({ ...ship, gunboats: [...ship.gunboats, newGunboat] })
    }
  }
  const removeGunboat = (id: number) => {
    const newGunboats = ship.gunboats.filter((g: gunboat) => g.id !== id)
    setShip({ ...ship, gunboats: newGunboats })
  }
  const getGunboat = (id: number) => {
    return ship.gunboats.filter((g: gunboat) => g.id === id)[0]
  }
  const editGunboat = (
    id: number,
    field: string,
    value: string | number | string[]
  ) => {
    const newGunboat = { ...getGunboat(id), [field]: value }
    setShip({
      ...ship,
      gunboats: ship.gunboats.map((gb: gunboat) =>
        gb.id === id ? newGunboat : gb
      ),
    })
  }

  return (
    <>
      {ship.gunboatRacks > 0 && (
        <>
          <InputWrapper
            label='Space available for gunboats'
            style={{ width: "100%" }}
          >
            <Group noWrap align='center' style={{ width: "100%" }}>
              <Badge variant='filled' color={spaceLeft ? "blue" : "red"}>
                {spaceLeft} racks
              </Badge>
            </Group>
          </InputWrapper>
          <Button
            disabled={spaceLeft < 1}
            variant='default'
            fullWidth
            my='sm'
            onClick={addGunboat}
          >
            Add gunboats
          </Button>
          {ship.gunboats.map((gunboat: gunboat) => (
            <GunboatBuilder
              key={gunboat.id}
              gunboat={gunboat}
              removeGunboat={() => removeGunboat(gunboat.id)}
              editGunboat={editGunboat}
              spaceLeft={spaceLeft}
            />
          ))}
          <Divider my='sm' />
        </>
      )}
    </>
  )
}

export default Gunboats
