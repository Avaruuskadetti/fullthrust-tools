import { FC } from "react"
import { Text } from "@mantine/core"
import {
  getSpinalBlueprint,
  spinalmount,
  spinalmountClasses,
} from "../../resources/spinalMounts"

interface SpinalMountsDataProps {
  ship: any
}
const SpinalMountsData: FC<SpinalMountsDataProps> = ({ ship }) => {
  const getSpinalMountClass = (sm: spinalmount) => {
    const spinalClass = spinalmountClasses.filter(
      (c) => c.value === sm.mass.toString()
    )[0].label
    return spinalClass
  }
  const mapping = (sm: spinalmount) => {
    const bp = getSpinalBlueprint(sm.value)
    return (
      <Text key={sm.label}>{`${sm.count}x ${getSpinalMountClass(sm)} ${
        sm.label
      }`}</Text>
    )
  }
  return ship.spinalMounts.length > 0 ? ship.spinalMounts.map(mapping) : <></>
}

export default SpinalMountsData
