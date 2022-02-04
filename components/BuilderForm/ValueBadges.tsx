import { FC, ReactNode } from "react"
import { Group, Badge } from "@mantine/core"
interface ValueBadgesProps {
  mass?: number
  npv?: number
  cpv?: number
  my?: string
  mt?: string
  mb?: string
}
const ValueBadges: FC<ValueBadgesProps> = ({ mass, npv, cpv, mt, my, mb }) => {
  return (
    <Group mt={mt ? mt : "md"} my={my && my} mb={mb && mb} spacing='xs'>
      {mass !== undefined && (
        <Badge variant='outline' color='blue'>
          {mass} mass
        </Badge>
      )}
      {npv !== undefined && (
        <Badge variant='outline' color='green'>
          {npv} {cpv ? "npv" : "points"}
        </Badge>
      )}
      {cpv !== undefined && (
        <Badge variant='outline' color='orange'>
          {cpv} cpv
        </Badge>
      )}
    </Group>
  )
}
export default ValueBadges
