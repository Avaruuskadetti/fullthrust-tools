import { FunctionComponent } from "react"
import {
  Divider,
  Text,
  Group,
  NumberInput,
  Badge,
  InputWrapper,
} from "@mantine/core"
import ValueBadges from "./ValueBadges"
import { ship } from "../../resources/ship"
import { countDCP } from "../../logic/helpers"
import points from "../../resources/points"
interface CrewBuilderProps {
  ship: ship
  setShip: (s: ship) => any
}

const CrewBuilder: FunctionComponent<CrewBuilderProps> = ({
  ship,
  setShip,
}) => {
  const spaceDCP =
    countDCP(ship.mass) -
    Math.max(ship.marines - ship.marineSpaces * 3, 0) +
    ship.passengerSpaces * 4
  // for the emperor
  const spaceMarines =
    countDCP(ship.mass) -
    Math.max(ship.extraDCP - ship.passengerSpaces * 4, 0) +
    ship.marineSpaces * 3

  return (
    <>
      <Divider mt={16} mb={8} />
      <Text weight={600}>Additional crew</Text>
      <InputWrapper
        label='Space available for crew'
        style={{ width: "100%" }}
        mb='sm'
      >
        <Group noWrap>
          <Badge
            variant='filled'
            color={spaceDCP - ship.extraDCP > 0 ? "blue" : "red"}
          >
            {spaceDCP - ship.extraDCP} for DCPs
          </Badge>
          <Badge
            variant='filled'
            color={spaceMarines - ship.marines > 0 ? "blue" : "red"}
          >
            {spaceMarines - ship.marines} for Marines
          </Badge>
        </Group>
      </InputWrapper>
      <Group noWrap>
        <NumberInput
          min={0}
          max={spaceDCP}
          value={ship.extraDCP}
          onChange={(value) =>
            Number.isInteger(value) && setShip({ ...ship, extraDCP: value })
          }
          label='Additional DCPs'
        />
        <NumberInput
          min={0}
          max={spaceMarines}
          value={ship.marines}
          onChange={(value) =>
            Number.isInteger(value) && setShip({ ...ship, marines: value })
          }
          label='Marines'
        />
      </Group>
      <ValueBadges
        npv={ship.marines * points.marines + ship.extraDCP * points.dcp}
      />
    </>
  )
}

export default CrewBuilder
