import { FC } from "react"
import { Group, NumberInput, Switch, Divider, Badge } from "@mantine/core"
import {
  getFighterGroupCount,
  getRobotGroupCount,
  getAvailableHangars,
  getAvailableRobotHangars,
  calculateHangarsValue,
} from "../../logic/helpers"
import mass from "../../resources/masses"
import { calculateHangarMass } from "../../logic/massCalculation"
interface HangarsProps {
  ship: any
  setShip: any
}
const Hangars: FC<HangarsProps> = ({ ship, setShip }) => {
  const canRemoveHangar = (): boolean => {
    const spaceInHangarsAndRacks = getAvailableRobotHangars(ship) > 0
    const spaceInHangars = getAvailableHangars(ship) > 0
    const robotsOnboard = getRobotGroupCount(ship) > 0
    return spaceInHangars || (spaceInHangarsAndRacks && robotsOnboard)
  }
  const handleHangars = (value: number) => {
    if (canRemoveHangar() || value > ship.hangars) {
      setShip({ ...ship, hangars: value })
    }
  }
  const handleRacks = (value: number) => {
    if (getAvailableRobotHangars(ship) > 0 || value > ship.fighterRacks) {
      setShip({ ...ship, fighterRacks: value })
    }
  }
  return (
    <>
      <Group noWrap align='end'>
        <NumberInput
          min={canRemoveHangar() ? 0 : ship.hangars}
          value={ship.hangars}
          onChange={handleHangars}
          label='Hangar bays'
        />
        <NumberInput
          min={0}
          value={ship.launchTubes}
          onChange={(value) => setShip({ ...ship, launchTubes: value })}
          label='Launch tubes'
        />
        <Switch
          checked={ship.launchCatapults}
          onChange={(event) =>
            setShip({ ...ship, launchCatapults: event.currentTarget.checked })
          }
          label='Launch catapults'
        />
      </Group>
      <Group noWrap>
        <NumberInput
          min={getAvailableRobotHangars(ship) > 0 ? 0 : ship.fighterRacks}
          value={ship.fighterRacks}
          onChange={handleRacks}
          label='Fighter racks'
        />
        <NumberInput
          value={ship.gunboatRacks}
          onChange={(value) => setShip({ ...ship, gunboatRacks: value })}
          label='Gunboat racks'
        />
      </Group>
      <Group mt='md' spacing='xs'>
        <Badge variant='outline' color='blue'>
          {calculateHangarMass(ship)} Mass
        </Badge>
        <Badge variant='outline' color='green'>
          {calculateHangarsValue(ship)} NPV
        </Badge>
        <Badge variant='outline' color='orange'>
          {calculateHangarsValue(ship, true)} CPV
        </Badge>
      </Group>
      <Divider mt={16} mb={8} />
    </>
  )
}
export default Hangars
