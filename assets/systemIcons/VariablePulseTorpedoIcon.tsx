import { FC } from "react"
import BaseIcon from "./parts/BaseIcon"
import InnerCircle from "./parts/InnerCircle"
import Pulse from "./parts/Pulse"
import Arcs from "./parts/Arcs"

/**
 * @param variant: 'S' for short range, 'L' for long range
 * @returns react component pulse torpedo icon
 */
const PulseTorpedoIcon: FC = () => (
  <BaseIcon value='V' fontSize='0.8'>
    <InnerCircle fill='black' />
    <Pulse />
    <Arcs arcs={[1, 2, 6]} select={[6, 1, 2]} />
  </BaseIcon>
)
export default PulseTorpedoIcon
