import { FC, useState } from "react"
import styles from "./ShipData.module.css"
import ShipDataView from "./ShipData"
import { Button, Modal, Title, Badge } from "@mantine/core"
import RocketIcon from "../../assets/RocketIcon"
import { ship } from "../../resources/ship"
import { calculateMass } from "../../logic/massCalculation"
import { calculateShipValue } from "../../logic/helpers"

interface ShipDataProps {
  ship: ship
  ships: ship[]
}
const ShipData: FC<ShipDataProps> = ({ ship, ships }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={styles.container}>
        {ships.map((s: ship) => (
          <ShipDataView key={s.id} ship={ship} withPaper />
        ))}
      </div>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title={
          <Title order={2}>{ship.name ? ship.name : "[unnamed ship]"}</Title>
        }
      >
        <ShipDataView ship={ship} />
      </Modal>
      <div className={styles.buttonContainer}>
        <Badge
          className={styles.buttonMass}
          color={ship.mass - calculateMass(ship) < 0 ? "red" : "blue"}
          variant='filled'
        >
          Mass {ship.mass - calculateMass(ship)}
        </Badge>
        <Badge className={styles.buttonNPV} color='green' variant='filled'>
          NPV {calculateShipValue(ship)}
        </Badge>
        <Badge className={styles.buttonCPV} color='orange' variant='filled'>
          CPV {calculateShipValue(ship, true)}
        </Badge>
        <Button
          radius='xl'
          className={styles.button}
          onClick={() => setOpen(true)}
        >
          <RocketIcon cssModule={styles.buttonIcon} />
        </Button>
      </div>
    </>
  )
}
export default ShipData
