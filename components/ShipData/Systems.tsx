import { FC } from "react"
import { Text } from "@mantine/core"
interface SystemsProps {
  ship: any
}
const Systems: FC<SystemsProps> = ({ ship }) => {
  const mapping = (system: any) => {
    if (system.count) {
      return (
        <Text key={system.label}>
          {system.count} {system.label}
        </Text>
      )
    } else {
      return <Text key={system.label}>{system.label}</Text>
    }
  }
  return ship.systems.length > 0 ? ship.systems.map(mapping) : <></>
}

export default Systems
