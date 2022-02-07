import { FC } from "react"
import { Text } from "@mantine/core"
import { ship } from "../../resources/ship"
interface CrewDataProps {
  ship: ship
}
const CrewData: FC<CrewDataProps> = ({ ship }) => {
  const baseDCP = Math.ceil(ship.mass / 20)
  const totalDCP = baseDCP + ship.extraDCP
  const marines = ship.marines
  return (
    <>
      <Text>
        {totalDCP}x damage control part{totalDCP > 1 ? "ies" : "y"}
      </Text>
      {marines > 0 && (
        <Text>
          {marines}x marine{marines > 1 && "s"}
        </Text>
      )}
    </>
  )
}

export default CrewData
