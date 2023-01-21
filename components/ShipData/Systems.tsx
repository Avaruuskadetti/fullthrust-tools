import { FC } from "react"
import { Text } from "@mantine/core"
interface SystemsProps {
  ship: any
}
const Systems: FC<SystemsProps> = ({ ship }) => {
  const mapping = (system: any) => {
    let systemString: string
    if (system.count) {
      systemString = `${system.count} ${system.label}`
    } else if (system.size) {
      systemString = `${system.label} ${system.size}`
    } else {
      systemString = system.label
    }

    return <Text key={system.label}>{systemString}</Text>
  }
  return ship.systems.length > 0 ? ship.systems.map(mapping) : <></>
}

export default Systems
