import points from "../resources/points"
import shipComponents from "../resources/shipComponents"
import mass from "../resources/masses"
import { fighters } from "../resources/fighters"
import { getWeaponBlueprint, weapon } from "../resources/weapons"
import { ship } from "../resources/ship"
import { getOrdnanceBlueprint, ordnance } from "../resources/ordnance"
import { getSpinalBlueprint, spinalmount } from "../resources/spinalMounts"
import masses from "../resources/masses"
import { gunboat, gunboats } from "../resources/gunboats"

/* Divides hull boxes to rows, returns an array with number of boxes/row */
export const calculateHullArray = (hull: number, rows: number) => {
  let hullArray = Array(rows).fill(0)
  let currentRow = 0
  for (let i = hull; i > 0; i--) {
    hullArray[currentRow] += 1
    currentRow < rows - 1 ? (currentRow += 1) : (currentRow = 0)
  }
  return hullArray
}

export const arraySum = (array: number[]) =>
  array.length > 0 ? array.reduce((prev, curr) => prev + curr) : 0
export const printNumberArray = (array: number[]) =>
  array.map((row, index) => (index < array.length - 1 ? row + "," : row))
export const countDCP = (mass: number) => Math.ceil(mass / 20)

/* Ship component related functions */
export const getShipComponent = (value: string) => {
  const found = shipComponents.filter((sc) => sc.value === value)[0]
  return found
}

/* Fighter related functions */
interface Fighter {
  type: string
  mods: string[]
  groups: number
  id: number
}
export const printFighter = (fighter: Fighter) => {
  const modLabels = fighter.mods.map(
    (modValue) => fighters.mods.filter((m) => m.value === modValue)[0].label
  )
  const type = fighters.types.filter((f) => f.value === fighter.type)[0]
  const typeLabel = type ? type.label.toLowerCase() : ""
  return `${fighter.groups} ${modLabels.join(", ")} ${
    typeLabel ? typeLabel : ""
  } fighter group${fighter.groups > 1 ? "s" : ""}`
}
export const printGunboat = (gunboat: gunboat) => {
  const modLabels = gunboat.mods.map(
    (modValue) => gunboats.mods.filter((m) => m.value === modValue)[0].label
  )
  const type = gunboats.types.filter((g) => g.value === gunboat.type)[0]
  const typeLabel = type ? type.label.toLowerCase() : ""
  return `${gunboat.groups} ${modLabels.join(", ")} ${typeLabel} gunboat group${
    gunboat.groups > 1 ? "s" : ""
  }`
}
export const getFighterGroupCount = (ship: any): number => {
  return ship.fighters.reduce(
    (acc: number, curr: Fighter) =>
      curr.mods.includes("robot") ? acc : acc + curr.groups,
    0
  )
}
export const getRobotGroupCount = (ship: any): number => {
  return ship.fighters.reduce(
    (acc: number, curr: Fighter) =>
      !curr.mods.includes("robot") ? acc : acc + curr.groups,
    0
  )
}
/* Checks for human-viable hangar space */
export const getAvailableHangars = (ship: any) => {
  return Math.min(
    ship.hangars - getFighterGroupCount(ship),
    ship.hangars +
      ship.fighterRacks -
      getFighterGroupCount(ship) -
      getRobotGroupCount(ship)
  )
}
/* Checks for robot-viable hangar & rack space */
export const getAvailableRobotHangars = (ship: ship) =>
  ship.hangars +
  ship.fighterRacks -
  getFighterGroupCount(ship) -
  getRobotGroupCount(ship)

export const getFighterTypeData = (value: string) =>
  fighters.types.filter((type) => type.value === value)[0]

/* SHIP POINT CALCULATION RELATED FUNCTIONS */
/* Helper functions */
export const asPoints = (value: number) => (value > 1 ? Math.round(value) : 1)

export const calculateHullCPV = (ship: ship) => {
  // const ftlMass =
  //   ship.ftlDrive !== "none"
  //     ? ship.ftlDrive === "standard"
  //       ? ship.mass * mass.stdFtlFactor
  //       : ship.mass * mass.advFtlFactor
  //     : 0
  // INCLUDE ABOVE FTLMASS IF FTL MASS IS INCLUDED AS NON-COMBAT MASS! THEN ALSO REDUCE FTL POINTS TO 0 SOMEWHERE
  const nonCombatMass =
    ship.cargoSpaces * mass.cargoSpace +
    ship.passengerSpaces * mass.passengerSpace +
    ship.marineSpaces * mass.marineSpace +
    ship.hangars * mass.hangar +
    ship.launchTubes * mass.launchTube +
    ship.fighterRacks * mass.fighterRack
  const cpvMass = Math.round(Math.pow(ship.mass - nonCombatMass, 2) / 100)
  return cpvMass && cpvMass > 0 ? cpvMass : 1
}

const getHullFactor = (rows = 4) => {
  switch (rows) {
    case 3:
      return points.threeRowHull
    case 4:
      return points.fourRowHull
    case 5:
      return points.fiveRowHull
    case 6:
      return points.sixRowHull
    default:
      return 0
  }
}

export const calculateArmorValue = (ship: ship) => {
  const armorReducer = (acc: number, curr: number, index: number) =>
    acc + curr * (index + 1) * 2
  const armorValue = ship.armor.reduce(armorReducer, 0)
  const regenValue =
    ship.regenArmor.reduce(armorReducer, 0) +
    2 * ship.regenArmor.reduce((a, b) => a + b, 0)
  return armorValue + regenValue
}

const calculateSystemsValue = (ship: ship) => {
  const reducer = (prev: number, curr: any) => {
    const points = getShipComponent(curr.value).points(ship)
    return prev + points
  }
  return ship.systems.reduce(reducer, 0)
}

export const calculateHangarsValue = (ship: ship, cpv?: boolean) => {
  const catapults = ship.launchCatapults
    ? points.catapultsPerTube * ship.launchTubes
    : 0
  return cpv
    ? ship.hangars * masses.hangar +
        ship.launchTubes * masses.launchTube +
        ship.fighterRacks * masses.fighterRack +
        catapults
    : points.hangar * ship.hangars +
        points.launchTube * ship.launchTubes +
        points.rack * ship.fighterRacks +
        catapults
}

export const calculateFightersValue = (ship: ship, cpv: boolean = false) => {
  const reducer = (acc: number, curr: Fighter) => {
    if (curr.type) {
      const typeData = fighters.types.filter((f) => f.value === curr.type)[0]
      const modData = fighters.mods.filter((f) => curr.mods.includes(f.value))
      const modPoints = modData.reduce((a, m) => a + m.points, 0)
      const points = (typeData.points + modPoints) * curr.groups
      const cpvExtra = curr.mods.includes("long") ? 42 : 30
      return cpv ? acc + points + cpvExtra : acc + points
    }
    return acc
  }
  return ship.fighters.reduce(reducer, 0)
}

const calculateWeaponsValue = (ship: ship) => {
  const reducer = (acc: number, curr: weapon) => {
    const bp = getWeaponBlueprint(curr.value)
    const points = bp.points(curr, ship)
    return acc + points
  }
  return ship.weapons.reduce(reducer, 0)
}

const calculateOrdnanceValue = (ship: ship) => {
  const reducer = (acc: number, curr: ordnance) => {
    const bp = getOrdnanceBlueprint(curr.value)
    const points = bp.points(curr)
    return acc + points
  }
  return ship.ordnance.reduce(reducer, 0)
}

const calculateSpinalValue = (ship: ship) => {
  const reducer = (acc: number, curr: spinalmount) => {
    const bp = getSpinalBlueprint(curr.value)
    const points = bp.points(curr)
    return acc + points
  }
  return ship.spinalMounts.reduce(reducer, 0)
}

export const calculateFtlValue = (ship: ship) => {
  const ftl =
    ship.ftlDrive === "standard"
      ? points.ftlStdFactor * ship.mass * masses.stdFtlFactor
      : ship.ftlDrive === "advanced"
      ? points.ftlAdvFactor * ship.mass * masses.advFtlFactor
      : 0
  return ftl === 0 ? 0 : asPoints(ftl)
}

export const calculateDriveValue = (ship: ship) =>
  asPoints(
    ship.driveType === "standard"
      ? points.driveStdFactor * ship.drive * ship.mass
      : points.driveAdvFactor * ship.drive * ship.mass
  )

export const calculateStreamliningValue = (ship: ship) =>
  ship.streamlining !== "none"
    ? ship.streamlining === "full"
      ? asPoints(points.fullStreamliningFactor * ship.mass)
      : asPoints(points.partialStreamliningFactor * ship.mass)
    : 0

export const calculateHullValue = (ship: ship) =>
  asPoints(ship.hull * getHullFactor(ship.hullRows))

export const calculateStealthHullValue = (ship: ship) =>
  ship.stealthHull !== "none"
    ? ship.stealthHull === "lvl2"
      ? points.stealthHullLvl2Factor * (ship.hull + arraySum(ship.armor))
      : points.stealthHullLvl1Factor * (ship.hull + arraySum(ship.armor))
    : 0
/* Main scoring function */
export const calculateShipValue = (ship: any, cpv: boolean = false) => {
  const tmf = cpv ? calculateHullCPV(ship) : ship.mass
  /* Hull boxes times hull row factor from helper function */
  const hull = calculateHullValue(ship)
  const armor = calculateArmorValue(ship)
  const stealthHull = calculateStealthHullValue(ship)

  const ftl = calculateFtlValue(ship)
  /* Drive mass: 0.05 * drive rating * mass, points 2x std, 3x adv  */
  const drive = calculateDriveValue(ship)
  /* Streamlining */
  const streamlining = calculateStreamliningValue(ship)
  /* Hangars & racks */

  const hangars = calculateHangarsValue(ship, cpv) // includes racks and tubes too
  // gunboat racks don't cost points
  const fighters = calculateFightersValue(ship, cpv)
  /* Crew */
  const crew = points.marines * ship.marines + points.dcp * ship.extraDCP

  const systems = calculateSystemsValue(ship)
  const weapons = calculateWeaponsValue(ship)
  const ordnance = calculateOrdnanceValue(ship)
  const spinal = calculateSpinalValue(ship)
  const flawed = ship.flawed ? 0.8 : 1
  /* FINAL CALCULATION */
  return asPoints(
    (tmf +
      hull +
      armor +
      stealthHull +
      ftl +
      drive +
      streamlining +
      hangars +
      fighters +
      crew +
      systems +
      weapons +
      ordnance +
      spinal) *
      flawed
  )
}
