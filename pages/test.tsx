import GatlingBatteryIcon from "../assets/systemIcons/GatlingBatteryIcon"
import PulseTorpedoIcon from "../assets/systemIcons/PulseTorpedoIcon"
import VariablePulseTorpedoIcon from "../assets/systemIcons/VariablePulseTorpedoIcon"
import TwinParticleArrayIcon from "../assets/systemIcons/TwinParticleArrayIcon"
import MesonProjectorIcon from "../assets/systemIcons/MesonProjectorIcon"
import BeamIcon from "../assets/systemIcons/BeamIcon"
import GraserIcon from "../assets/systemIcons/GraserIcon"
import NeedleBeamIcon from "../assets/systemIcons/NeedleBeamIcon"
import PlasmaCannonIcon from "../assets/systemIcons/PlasmaCannonIcon"
import EmpProjectorIcon from "../assets/systemIcons/EmpProjectorIcon"
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
import PointDefenseSystemIcon from "../assets/systemIcons/PointDefenseSystemIcon"
import AreaDefenseSystemIcon from "../assets/systemIcons/AreaDefenseSystemIcon"
import ScattergunIcon from "../assets/systemIcons/ScatterGunIcon"
import GrapeshotIcon from "../assets/systemIcons/GrapeshotIcon"
import FireConIcon from "../assets/systemIcons/FireConIcon"
import AdvancedFireConIcon from "../assets/systemIcons/AdvancedFireConIcon"
import ADFCIcon from "../assets/systemIcons/ADFCIcon"
import AADFCIcon from "../assets/systemIcons/AADFCIcon"
import ScreenIcon from "../assets/systemIcons/ScreenIcon"
import StealthFieldIcon from "../assets/systemIcons/StealthFieldIcon"
import AdvancedScreenIcon from "../assets/systemIcons/AdvancedScreenIcon"
import AreaScreenIcon from "../assets/systemIcons/AreaScreenIcon"
import AdvancedAreaScreenIcon from "../assets/systemIcons/AdvancedAreaScreenIcon"
import HolofieldIcon from "../assets/systemIcons/HolofieldIcon"
import ECMIcon from "../assets/systemIcons/ECMIcon"
import AreaECMIcon from "../assets/systemIcons/AreaECMIcon"
import CloakingDeviceIcon from "../assets/systemIcons/CloakingDeviceIcon"
import CloakingFieldIcon from "../assets/systemIcons/CloakingFieldIcon"
import TuffleyCloak from "../assets/systemIcons/TuffleyCloakIcon"
import TuffleyCloakIcon from "../assets/systemIcons/TuffleyCloakIcon"
import ReflexFieldIcon from "../assets/systemIcons/ReflexFieldIcon"
import CoreSystemsIcon from "../assets/systemIcons/CoreSystemsIcon"

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
        <EmpProjectorIcon value='II' arcs={[6, 1, 2]} />
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
      <WithLabel label='PDS'>
        <PointDefenseSystemIcon />
      </WithLabel>
      <WithLabel label='ADS'>
        <AreaDefenseSystemIcon arcs={[1, 2, 3, 4, 5, 6]} />
      </WithLabel>
      <WithLabel label='Scattergun'>
        <ScattergunIcon />
      </WithLabel>
      <WithLabel label='Grapeshot'>
        <GrapeshotIcon />
      </WithLabel>
      <WithLabel label='FireCon'>
        <FireConIcon />
      </WithLabel>
      <WithLabel label='Advanced FireCon'>
        <AdvancedFireConIcon />
      </WithLabel>
      <WithLabel label='ADFC'>
        <ADFCIcon />
      </WithLabel>
      <WithLabel label='AADFC'>
        <AADFCIcon />
      </WithLabel>
      <WithLabel label='Screen'>
        <ScreenIcon />
      </WithLabel>
      <WithLabel label='Advanced Screen'>
        <AdvancedScreenIcon />
      </WithLabel>
      <WithLabel label='Stealth Field'>
        <StealthFieldIcon />
      </WithLabel>
      <WithLabel label='Area Screen'>
        <AreaScreenIcon />
      </WithLabel>
      <WithLabel label='Advanced Area Screen'>
        <AdvancedAreaScreenIcon />
      </WithLabel>
      <WithLabel label='Holofield'>
        <HolofieldIcon />
      </WithLabel>
      <WithLabel label='ECM'>
        <ECMIcon />
      </WithLabel>
      <WithLabel label='Area ECM'>
        <AreaECMIcon />
      </WithLabel>
      <WithLabel label='Cloaking Device'>
        <CloakingDeviceIcon />
      </WithLabel>
      <WithLabel label='Cloaking Field'>
        <CloakingFieldIcon />
      </WithLabel>
      <WithLabel label='Tuffley Cloak'>
        <TuffleyCloakIcon />
      </WithLabel>
      <WithLabel label='Reflex Field'>
        <ReflexFieldIcon />
      </WithLabel>
    </div>
    <div style={{ marginTop: "2rem" }}>
      <CoreSystemsIcon />
    </div>
  </div>
)
export default Test
