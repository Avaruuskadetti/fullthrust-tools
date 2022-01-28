import { FC, useState } from "react"
import {
  Group,
  NumberInput,
  Button,
  Divider,
  Text,
  Paper,
  MultiSelect,
  Select,
  SimpleGrid,
  Switch,
  Title,
  Chips,
  Chip,
  InputWrapper,
  Grid,
  Badge,
} from "@mantine/core"
import { fighters } from "../../resources/fighters"
import {
  getFighterGroupCount,
  getRobotGroupCount,
  getAvailableHangars,
  getAvailableRobotHangars,
} from "../../logic/helpers"
import FighterComponent from "./Fighter"
import ChipIcon from "../../assets/ChipIcon"
import PersonIcon from "../../assets/PersonIcon"

interface FightersProps {
  ship: any
  setShip: any
}
interface FighterOnShip {
  groups: number
  id: number
  mods: string[]
  type: string
}

const Fighters: FC<FightersProps> = ({ ship, setShip }) => {
  const getID = () =>
    ship.fighters.length > 0
      ? Math.max(...ship.fighters.map((f: any) => f.id)) + 1
      : 1

  const addFighter = () => {
    /* Checks if there is space in hangars. If there is for robots but not for humans, force fighter type to robot. If there is no space for robots either, don't add anything. */
    const needsToBeRobot = getAvailableHangars(ship) < 1
    const spaceLeft = getAvailableRobotHangars(ship) > 0
    const newFighter = {
      id: getID(),
      groups: 1,
      type: "",
      mods: needsToBeRobot ? ["robot"] : [],
    }
    if (spaceLeft) {
      setShip({ ...ship, fighters: [...ship.fighters, newFighter] })
    }
  }
  const removeFighter = (id: number) => {
    const newFighters = [...ship.fighters].filter((f) => f.id !== id)
    setShip({ ...ship, fighters: newFighters })
  }

  const getFighter = (id: number) =>
    ship.fighters.filter((f: any) => f.id === id)[0]

  const editFighter = (id: number, field: string, value: any): boolean => {
    /* Check for hangar space in case of robot > human changes */
    const noRobotInValue = Array.isArray(value)
      ? !value.includes("robot")
      : true
    /* Is this group robots and are they changing to humans? */
    const robotsChangingToFighters =
      getFighter(id).mods.includes("robot") &&
      field === "mods" &&
      noRobotInValue
    /* If this group would change to humans, what would be the total number of human fighters? */
    const newFighterCount = getFighterGroupCount(ship) + getFighter(id).groups
    /* If they changed, would there be space? */
    if (robotsChangingToFighters && ship.hangars < newFighterCount) {
      return false
    }
    /* If there would be, go on and modify state */
    const newFighter = { ...getFighter(id), [field]: value }
    setShip({
      ...ship,
      fighters: ship.fighters.map((f: any) => (f.id === id ? newFighter : f)),
    })
    return true
  }

  const getFighterMax = (fighter: FighterOnShip): number => {
    const isRobot = fighter.mods.includes("robot")
    const max = isRobot
      ? fighter.groups + getAvailableRobotHangars(ship)
      : fighter.groups + getAvailableHangars(ship)
    return max
  }

  return (
    <Group direction='column'>
      {ship.hangars + ship.fighterRacks > 0 && (
        <>
          <InputWrapper
            label='Space available for fighters'
            style={{ width: "100%" }}
          >
            <Group noWrap align='center' style={{ width: "100%" }}>
              <Badge
                leftSection={<PersonIcon w='14' h='14' />}
                variant='filled'
                color={getAvailableHangars(ship) > 0 ? "blue" : "red"}
              >
                {getAvailableHangars(ship)} for humans
              </Badge>
              <Badge
                leftSection={<ChipIcon w='14' h='14' />}
                variant='filled'
                color={getAvailableRobotHangars(ship) > 0 ? "blue" : "red"}
              >
                {getAvailableRobotHangars(ship)} for robots
              </Badge>
            </Group>
          </InputWrapper>

          <Button
            disabled={!(getAvailableRobotHangars(ship) > 0)}
            variant='default'
            fullWidth
            onClick={addFighter}
          >
            Add fighters
          </Button>

          {ship.fighters.map((fighter: any) => (
            <FighterComponent
              key={fighter.id}
              fighter={fighter}
              removeFighter={removeFighter}
              editFighter={editFighter}
              getFighterMax={getFighterMax}
            />
          ))}

          <Divider mb={8} variant='solid' style={{ width: "100%" }} />
        </>
      )}
    </Group>
  )
}
export default Fighters
