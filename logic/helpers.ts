import { stringify } from "querystring"
import points from "../resources/points"
import shipComponents from "../resources/shipComponents"
import { fighters } from "../resources/fighters"

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
export const countDCP = (hull: number) => Math.ceil(hull / 20)

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
  return `${fighter.groups} ${modLabels.join(", ")} ${
    fighter.type
  } fighter group${fighter.groups > 1 ? "s" : ""}`
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
export const getAvailableRobotHangars = (ship: any) =>
  ship.hangars +
  ship.fighterRacks -
  getFighterGroupCount(ship) -
  getRobotGroupCount(ship)

export const getFighterTypeData = (value: string) =>
  fighters.types.filter((type) => type.value === value)[0]

/* SHIP POINT CALCULATION RELATED FUNCTIONS */
/* Helper functions */
export const asPoints = (value: number) => (value > 1 ? Math.round(value) : 1)
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

const calculateSystemsValue = (ship: any) => {
  const reducer = (prev: any, curr: any) => {
    const points = getShipComponent(curr.value).points(ship)
    return prev + points
  }
  return ship.systems.reduce(reducer, 0)
}

const calculateFightersValue = (ship: any) => {
  const reducer = (acc: number, curr: Fighter) => {
    if (curr.type) {
      const typeData = fighters.types.filter((f) => f.value === curr.type)[0]
      const modData = fighters.mods.filter((f) => curr.mods.includes(f.value))
      const modPoints = modData.reduce((a, m) => a + m.points, 0)
      const points = (typeData.points + modPoints) * curr.groups
      return acc + points
    }
    return acc
  }
  return ship.fighters.reduce(reducer, 0)
}

/* Main scoring function */
export const calculateShipValue = (ship: any) => {
  /* Hull boxes times hull row factor from helper function */
  const hull = asPoints(ship.hull * getHullFactor(ship.hullRows))
  /* OBS! NOTE! HUOM! */
  /* MISSING ARMOR BOXES FROM CALCULATION! SHOULD BE FCTR * HULL + ARMORS */
  const stealthHull =
    ship.stealthHull !== "none"
      ? ship.stealthHull === "lvl2"
        ? points.stealthHullLvl2Factor * (ship.hull + arraySum(ship.armor))
        : points.stealthHullLvl1Factor * (ship.hull + arraySum(ship.armor))
      : 0

  /* 2x mass std, 3x mass adv. No asPoints: no need for rounding and 0 points possible */
  const ftl =
    ship.ftlDrive === "standard"
      ? points.ftlStdFactor * ship.mass
      : ship.ftlDrive === "advanced"
      ? points.ftlAdvFactor * ship.mass
      : 0
  /* Drive mass: 0.05 * drive rating * mass, points 2x std, 3x adv  */
  const drive = asPoints(
    ship.driveType === "standard"
      ? points.driveStdFactor * ship.drive * ship.mass
      : points.driveAdvFactor * ship.drive * ship.mass
  )
  /* Streamlining */
  const streamlining =
    ship.streamlining !== "none"
      ? ship.streamlining === "full"
        ? asPoints(points.fullStreamliningFactor * ship.mass)
        : asPoints(points.partialStreamliningFactor * ship.mass)
      : 0
  /* Hangars & racks */
  const catapults = ship.launchCatapults
    ? points.catapultsPerTube * ship.launchTubes
    : 0
  const hangars =
    points.hangar * ship.hangars +
    points.launchTube * ship.launchTubes +
    catapults
  const racks = 6 * ship.fighterRacks // gunboat racks don't cost points
  const fighters = calculateFightersValue(ship)
  /* Crew */
  const crew = points.marines * ship.marines + points.dcp * ship.extraDCP

  const systems = calculateSystemsValue(ship)
  const flawed = ship.flawed ? 0.8 : 1
  /* FINAL CALCULATION */
  return asPoints(
    (ship.mass +
      hull +
      stealthHull +
      ftl +
      drive +
      streamlining +
      hangars +
      racks +
      fighters +
      crew +
      systems) *
      flawed
  )
}
