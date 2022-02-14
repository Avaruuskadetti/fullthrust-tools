import { FC } from "react"
import { Text } from "@mantine/core"
import { getOrdnanceBlueprint, ordnance, salvo } from "../../resources/ordnance"
interface OrdnanceDataProps {
  ship: any
}

const printMagazine = (magazine: salvo[]) => {
  const salvos = magazine.map(
    (s: salvo) => `${s.count}x ${s.label.toLowerCase()}`
  )
  const salvoString = salvos.join(", ")
  return `(${salvoString})`
}

const OrdnanceData: FC<OrdnanceDataProps> = ({ ship }) => {
  const mapping = (o: ordnance) => {
    const bp = getOrdnanceBlueprint(o.value)
    if (o.count) {
      return (
        <Text key={o.label}>
          {`${o.count}x ${o.label} ${
            o.magazine ? printMagazine(o.magazine) : ""
          } ${o.variant ? " (" + o.variant.label.toLowerCase() + ")" : ""}`}
        </Text>
      )
    } else {
      return <Text key={o.label}>{o.label}</Text>
    }
  }
  return ship.ordnance.length > 0 ? ship.ordnance.map(mapping) : <></>
}

export default OrdnanceData
