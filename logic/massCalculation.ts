import mass from "../resources/masses"
import shipComponents from "../resources/shipComponents"
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

export const calculateMass = (ship: any) => {
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

  const systems = calculateSystemMass(ship)
  const weapons = calculateWeaponMass(ship)

  /* FINAL COMBINING */
  return drive + ftl + streamlining + armor + hangars + systems + weapons
}
