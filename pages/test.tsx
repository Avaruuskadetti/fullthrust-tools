import GatlingBatteryIcon from "../assets/systemIcons/GatlingBatteryIcon"
import PulseTorpedoIcon from "../assets/systemIcons/PulseTorpedoIcon"
import VariablePulseTorpedoIcon from "../assets/systemIcons/VariablePulseTorpedoIcon"
import TwinParticleArrayIcon from "../assets/systemIcons/TwinParticleArrayIcon"
import MesonProjectorIcon from "../assets/systemIcons/MesonProjectorIcon"
import BeamIcon from "../assets/systemIcons/BeamIcon"
import GraserIcon from "../assets/systemIcons/GraserIcon"
import NeedleBeamIcon from "../assets/systemIcons/NeedleBeamIcon"
import PlasmaCannonIcon from "../assets/systemIcons/PlasmaCannonIcon"
import EmpProjector from "../assets/systemIcons/EMPProjector"

import WithLabel from "../assets/systemIcons/WithLabel"
import HeavyGraserIcon from "../assets/systemIcons/HeavyGraserIcon"
import PhaserIcon from "../assets/systemIcons/PhaserIcon"
import TransporterBeamIcon from "../assets/systemIcons/TransporterBeamIcon"
import GraviticGunIcon from "../assets/systemIcons/GraviticGunIcon"
import PulserIcon from "../assets/systemIcons/PulserIcon"
import SubmunitionPackIcon from "../assets/systemIcons/SubmunitionPackIcon"
import KineticGunIcon from "../assets/systemIcons/KineticGunIcon"
import MultipleKineticPenetratorIcon from "../assets/systemIcons/MultipleKineticPenetratorIcon"
import FusionArrayIcon from "../assets/systemIcons/FusionArrayIcon"

const Test = () => (
  <div style={{ marginRight: "1rem" }}>
    <h1>SSD component generation test</h1>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "1rem",
      }}
    >
      <WithLabel label='Pulse Torpedo'>
        <PulseTorpedoIcon variant='S' />
      </WithLabel>
      <WithLabel label='Variable Pulse Torp.'>
        <VariablePulseTorpedoIcon />
      </WithLabel>
      <WithLabel label='Gatling'>
        <GatlingBatteryIcon arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='Twin Particle Array'>
        <TwinParticleArrayIcon arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='Meson Projector'>
        <MesonProjectorIcon arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='Beam'>
        <BeamIcon value='1' arcs={[2, 3, 5, 6]} />
      </WithLabel>
      <WithLabel label='Needle Beam'>
        <NeedleBeamIcon value='4' arcs={[1, 2]} />
      </WithLabel>
      <WithLabel label='Graser'>
        <GraserIcon value='3' arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='Heavy Graser'>
        <HeavyGraserIcon value='3' arcs={[1]} />
      </WithLabel>
      <WithLabel label='Phaser'>
        <PhaserIcon value='2' arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='Transporter Beam'>
        <TransporterBeamIcon value='1' arcs={[1, 2, 6]} />
      </WithLabel>
      <WithLabel label='Plasma Cannon'>
        <PlasmaCannonIcon value='3' arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='EMP Projector'>
        <EmpProjector value='II' arcs={[6, 1, 2]} />
      </WithLabel>
      <WithLabel label='Gravitic Gun'>
        <GraviticGunIcon value='1' arcs={[1, 2, 3, 4, 5, 6]} />
      </WithLabel>
      <WithLabel label='Pulser'>
        <PulserIcon arcs={[1, 2, 6]} />
      </WithLabel>
      <WithLabel label='Submunition Pack'>
        <SubmunitionPackIcon arcs={[1, 2, 3]} />
      </WithLabel>
      <WithLabel label='K-Gun (short)'>
        <KineticGunIcon value='3' variant='S' arcs={[1, 2, 6]} />
      </WithLabel>
      <WithLabel label='K-Gun (medium)'>
        <KineticGunIcon value='3' variant='M' arcs={[1, 2, 6]} />
      </WithLabel>
      <WithLabel label='K-Gun (long)'>
        <KineticGunIcon value='3' variant='L' arcs={[1, 2, 6]} />
      </WithLabel>
      <WithLabel label='Multiple Kinetic Penetrator'>
        <MultipleKineticPenetratorIcon />
      </WithLabel>
      <WithLabel label='Fusion Array'>
        <FusionArrayIcon arcs={[1]} />
      </WithLabel>
    </div>
  </div>
)
export default Test
