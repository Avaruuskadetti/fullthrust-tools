import { FC, useState } from "react"
import styles from "./ShipData.module.css"
import ShipDataView from "./ShipData"
import { Button, Modal, Title } from "@mantine/core"
import RocketIcon from "../../assets/RocketIcon"

interface ShipDataProps {
  ship: any
}
const ShipData: FC<ShipDataProps> = ({ ship }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={styles.container}>
        <ShipDataView ship={ship} withPaper />
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
      <Button
        radius='xl'
        className={styles.button}
        onClick={() => setOpen(true)}
      >
        <RocketIcon cssModule={styles.buttonIcon} />
      </Button>
    </>
  )
}
export default ShipData
