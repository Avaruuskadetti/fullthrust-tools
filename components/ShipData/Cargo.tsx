import { FC } from "react"
import { Text } from "@mantine/core"
import { ship } from "../../resources/ship"
interface CargoDataProps {
  ship: ship
}
const CargoData: FC<CargoDataProps> = ({ ship }) => {
  const cargo = ship.cargoSpaces
  const crew = ship.passengerSpaces
  const marine = ship.marineSpaces
  return (
    <>
      {cargo > 0 && <Text>{cargo} mass of cargo space</Text>}
      {crew > 0 && <Text>Quarters for {crew * 4} passengers</Text>}
      {marine > 0 && <Text>Quarters for {marine * 3} marines</Text>}
    </>
  )
}

export default CargoData
