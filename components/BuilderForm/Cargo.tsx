import { FC } from "react"
import { Text, Group, NumberInput } from "@mantine/core"
import ValueBadges from "./ValueBadges"
import { ship } from "../../resources/ship"
import { countDCP } from "../../logic/helpers"

interface CargoBuilderProps {
  ship: ship
  setShip: (s: ship) => any
}
const CargoBuilder: FC<CargoBuilderProps> = ({ ship, setShip }) => {
  const canRemoveMarineQuarter = (): boolean => {
    const marines = ship.marines
    const marineSpace = ship.marineSpaces
    return (
      countDCP(ship.mass) + marineSpace * 3 - 3 >
        marines + Math.max(ship.extraDCP - ship.passengerSpaces * 4, 0) &&
      ship.marineSpaces > 0
    )
  }
  const canRemovePassengerQuarter = (): boolean => {
    const DCP = ship.extraDCP
    const crewSpace = countDCP(ship.mass) + ship.passengerSpaces * 4
    return (
      crewSpace - 4 > DCP + Math.max(ship.marines - ship.marineSpaces * 3, 0) &&
      ship.passengerSpaces > 0
    )
  }

  return (
    <>
      <Text weight={600}>Cargo and passenger space (mass used)</Text>
      <Group noWrap>
        <NumberInput
          min={0}
          value={ship.cargoSpaces}
          onChange={(value) =>
            setShip({ ...ship, cargoSpaces: value as number })
          }
          label='Cargo'
        />
        <NumberInput
          min={Math.ceil(
            (ship.extraDCP -
              (countDCP(ship.mass) -
                Math.max(ship.marines - ship.marineSpaces * 3, 0))) /
              4
          )}
          value={ship.passengerSpaces}
          onChange={(value) => {
            if (
              canRemovePassengerQuarter() ||
              (value as number) >= ship.passengerSpaces
            ) {
              setShip({ ...ship, passengerSpaces: value as number })
            }
          }}
          label='Passenger'
        />
        <NumberInput
          min={Math.ceil(
            (ship.marines -
              (countDCP(ship.mass) -
                Math.max(ship.extraDCP - ship.passengerSpaces * 4, 0))) /
              3
          )}
          value={ship.marineSpaces}
          onChange={(value) => {
            if (
              canRemoveMarineQuarter() ||
              (value as number) >= ship.marineSpaces
            ) {
              setShip({ ...ship, marineSpaces: value as number })
            }
          }}
          label='Marine'
        />
      </Group>
      <ValueBadges
        mass={ship.cargoSpaces + ship.passengerSpaces + ship.marineSpaces}
      />
    </>
  )
}
export default CargoBuilder
