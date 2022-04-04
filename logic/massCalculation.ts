import mass from "../resources/masses"
import { getOrdnanceBlueprint, ordnance } from "../resources/ordnance"
import { ship } from "../resources/ship"
import { spinalmount } from "../resources/spinalMounts"
import { getWeaponBlueprint, weapon } from "../resources/weapons"
import { arraySum, getShipComponent } from "./helpers"

const asMass = (value: number) =>
  Math.round(value) > 0 ? Math.round(value) : 1

export const calculateDriveMass = (ship: ship) => {
  if (ship.drive === 0) {
    return 0
  }
  return ship.driveType === "standard"
    ? asMass(mass.stdDriveFactor * ship.drive * ship.mass)
    : asMass(mass.advDriveFactor * ship.drive * ship.mass)
}

export const calculateFtlMass = (ship: ship) =>
  ship.ftlDrive !== "none"
    ? ship.ftlDrive === "standard"
      ? asMass(mass.stdFtlFactor * ship.mass)
      : asMass(mass.advFtlFactor * ship.mass)
    : 0

export const calculateStreamliningMass = (ship: ship) =>
  ship.streamlining !== "none"
    ? ship.streamlining === "full"
      ? mass.fullStreamliningFactor * ship.mass
      : mass.partialStreamliningFactor * ship.mass
    : 0

export const calculateHangarMass = (ship: ship) =>
  mass.hangar * ship.hangars +
  mass.launchTube * ship.launchTubes +
  mass.fighterRack * ship.fighterRacks +
  mass.gunboatRack * ship.gunboatRacks

const calculateSystemMass = (ship: any) => {
  const systemMass = ship.systems.reduce(
    (acc: any, curr: any) => acc + getShipComponent(curr.value).mass(ship),
    0
  )
  return systemMass
}

const calculateWeaponMass = (ship: any) => {
  const reducer = (acc: number, curr: weapon) =>
    acc + Math.round(getWeaponBlueprint(curr.value).mass(curr, ship))
  return ship.weapons.reduce(reducer, 0)
}

const calculateOrdnanceMass = (ship: ship) => {
  const reducer = (acc: number, curr: ordnance) =>
    acc + Math.round(getOrdnanceBlueprint(curr.value).mass(curr))
  return ship.ordnance.reduce(reducer, 0)
}

const calculateSpinalMountsMass = (ship: ship) => {
  const reducer = (acc: number, curr: spinalmount) =>
    acc + Math.round(curr.mass * curr.count)
  return ship.spinalMounts.reduce(reducer, 0)
}

export const calculateArmorMass = (ship: ship) =>
  mass.armor * arraySum(ship.armor) +
  mass.regenArmor * arraySum(ship.regenArmor)

export const calculateMass = (ship: any) => {
  const hull = ship.hull

  const drive = calculateDriveMass(ship)

  const ftl = calculateFtlMass(ship)

  const streamlining = calculateStreamliningMass(ship)
  const armor = calculateArmorMass(ship)

  const hangars = calculateHangarMass(ship)

  const spaces = ship.cargoSpaces + ship.passengerSpaces + ship.marineSpaces

  const systems = calculateSystemMass(ship)
  const weapons = calculateWeaponMass(ship)
  const ordnance = calculateOrdnanceMass(ship)
  const spinals = calculateSpinalMountsMass(ship)

  /* FINAL COMBINING */
  return (
    hull +
    drive +
    ftl +
    streamlining +
    armor +
    hangars +
    spaces +
    systems +
    weapons +
    ordnance +
    spinals
  )
}
