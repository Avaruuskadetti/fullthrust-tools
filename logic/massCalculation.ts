import mass from "../resources/masses"
import { getOrdnanceBlueprint, ordnance } from "../resources/ordnance"
import { ship } from "../resources/ship"
import shipComponents from "../resources/shipComponents"
import { getSpinalBlueprint, spinalmount } from "../resources/spinalMounts"
import { getWeaponBlueprint, weapon } from "../resources/weapons"
import { arraySum, getShipComponent } from "./helpers"

const asMass = (value: number) =>
  Math.round(value) > 0 ? Math.round(value) : 1

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

export const calculateMass = (ship: any) => {
  const hull = ship.hull

  const drive =
    ship.driveType === "standard"
      ? asMass(mass.stdDriveFactor * ship.drive * ship.mass)
      : asMass(mass.advDriveFactor * ship.drive * ship.mass)

  const ftl =
    ship.ftlType !== "none"
      ? ship.ftlType === "standard"
        ? asMass(mass.stdFtlFactor * ship.mass)
        : asMass(mass.advFtlFactor * ship.mass)
      : 0

  const streamlining =
    ship.streamlining !== "none"
      ? ship.streamlining === "full"
        ? mass.fullStreamliningFactor * ship.mass
        : mass.partialStreamliningFactor * ship.mass
      : 0

  const armor =
    mass.armor * arraySum(ship.armor) +
    mass.regenArmor * arraySum(ship.regenArmor)

  const hangars =
    mass.hangar * ship.hangars +
    mass.launchTube * ship.launchTubes +
    mass.fighterRack * ship.fighterRacks +
    mass.gunboatRack * ship.gunboatRacks

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
