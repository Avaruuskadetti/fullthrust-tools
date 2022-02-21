import { FunctionComponent } from "react"
import { gunboat } from "../../resources/gunboats"
import { Text } from "@mantine/core"
import { printGunboat } from "../../logic/helpers"

interface GunboatDataProps {
  gunboats: gunboat[]
}

const GunboatData: FunctionComponent<GunboatDataProps> = ({ gunboats }) =>
  gunboats.length > 0 ? (
    <Text>{gunboats.map((gb: gunboat) => printGunboat(gb).toLowerCase())}</Text>
  ) : (
    <></>
  )

export default GunboatData
