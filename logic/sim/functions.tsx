import {
  turn,
  order,
  position,
  simShip,
  simulationShip,
  armorRow,
} from "./interfaces"
import settings from "./settings"

/* Get position change from move distance and facing. Facing directions are numbered clockwise from top by 60 deg steps */
const getPositionChange = (
  position: position,
  distance: number,
  facing: number
): position => {
  switch (facing) {
    case 1:
      return { ...position, y: position.y + distance }
    case 2:
      return {
        ...position,
        x: position.x + (Math.sqrt(3) / 2) * distance,
        y: position.y + 0.5 * distance,
      }
    case 3:
      return {
        ...position,
        x: position.x + (Math.sqrt(3) / 2) * distance,
        y: position.y - 0.5 * distance,
      }
    case 4:
      return { ...position, y: position.y - distance }
    case 5:
      return {
        ...position,
        x: position.x - (Math.sqrt(3) / 2) * distance,
        y: position.y - 0.5 * distance,
      }
    case 6:
      return {
        ...position,
        x: position.x - (Math.sqrt(3) / 2) * distance,
        y: position.y + 0.5 * distance,
      }
    default:
      return position
  }
}
/* Change as steps, negative counterclockwise and positive clockwise. Returns new facing */
const getFacingChange = (facing: number, change: number): number => {
  const newFacing = facing + change
  if (newFacing < 1) {
    return 6 + newFacing
  } else if (newFacing > 6) {
    return newFacing - 6
  }
  return newFacing
}

//////////////
// TAKE TWO //
//////////////

// GET ALL POSSIBLE TURNING COMBINATIONS
export const getPossibleTurns = (maxCourse: number): turn[] => {
  // Possible course change amounts, an array from [0 to maxCourse]
  const possibleCourseChanges = Array.from(Array(maxCourse + 1).keys())
  // For each turning amount, calculate possible LL, LR, RL, RR amounts
  const turns = possibleCourseChanges.flatMap((change) => {
    const a = Math.floor(change / 2)
    const b = Math.ceil(change / 2)
    if (a > 0 && b > 0) {
      // Double turns only if both have non-zero course changes
      return [
        { a: -a, b: -b }, // LL turn
        { a: -a, b: b }, // LR turn
        { a: a, b: -b }, // RL turn
        { a: a, b: b }, // RR turn
      ]
    } else if (b > 0) {
      // single turns on b-turn only
      return [
        { a: 0, b: -b },
        { a: 0, b: b },
      ]
    } else {
      // otherwise return a non-turn
      return [{ a: 0, b: 0 }]
    }
  })
  return turns
}
const parseTurnThrust = (t: turn) => Math.abs(t.a) + Math.abs(t.b)

const getPossibleAccelerations = (thrust: number, velocity: number) => {
  const accels = Array.from(Array(thrust * 2 + 1).keys())
    .map((x) => x - thrust)
    .filter((accel) => velocity + accel >= 0)

  return accels
}

export const getPossibleOrders = (
  ship: simShip,
  roundCourseChangeUp: boolean
): order[] => {
  const maxCourseChange = roundCourseChangeUp
    ? Math.ceil(ship.drive / 2)
    : Math.floor(ship.drive / 2)
  const turns = getPossibleTurns(maxCourseChange)

  const orders: order[] = turns.flatMap((t) => {
    const remainingThrust = ship.drive - parseTurnThrust(t)
    const accelerations = getPossibleAccelerations(
      remainingThrust,
      ship.velocity
    )
    return accelerations.map((a) => ({ turn: t, acceleration: a }))
  })
  return orders
}

// Given a ship and a order, returns an end position for that order
export const executeOrder = (ship: simShip, order: order) => {
  const newVelocity = ship.velocity + order.acceleration
  const aVel = Math.floor(newVelocity / 2)
  const bVel = Math.ceil(newVelocity / 2)
  const aTurn = order.turn.a
  const bTurn = order.turn.b
  const position1 = {
    ...ship.position,
    facing: getFacingChange(ship.position.facing, aTurn),
  }
  const position2 = getPositionChange(position1, aVel, position1.facing)
  const position3 = {
    ...position2,
    facing: getFacingChange(position2.facing, bTurn),
  }
  const position4 = getPositionChange(position3, bVel, position3.facing)
  return position4
}

// Returns an array of all possible end positions for a ship during one move
export const getPossiblePositions = (
  ship: simShip,
  roundCourseChangeUp: boolean
) => {
  const possibleOrders = getPossibleOrders(ship, roundCourseChangeUp)
  const positions = possibleOrders.map((order: order) =>
    executeOrder(ship, order)
  )
  return positions
}

/* Input: 2 positions, self and target.
Output: arc where target is relative to self and playing area
(doesn't take heading to account!) */
export const targetOnArc = (self: position, target: position): number => {
  const xDiff = target.x - self.x
  const yDiff = target.y - self.y
  if (xDiff >= 0 && yDiff >= 0) {
    // upper right quadrant
    if (yDiff / xDiff > Math.sqrt(3)) {
      // front arc (1)
      return 1
    } else {
      // starboard front arc (2)
      return 2
    }
  } else if (xDiff >= 0 && yDiff < 0) {
    // lower right quadrant
    if (Math.abs(yDiff) / xDiff > Math.sqrt(3)) {
      // back arc (4)
      return 4
    } else {
      // starboard back arc (3)
      return 3
    }
  } else if (xDiff < 0 && yDiff < 0) {
    // lower left quadrant
    if (Math.abs(yDiff) / Math.abs(xDiff) < Math.sqrt(3)) {
      // port back arc (5)
      return 5
    } else {
      // back arc (4)
      return 4
    }
  } else if (xDiff < 0 && yDiff >= 0) {
    // upper left quadrant
    if (yDiff / Math.abs(xDiff) > Math.sqrt(3)) {
      // front arc (1)
      return 1
    } else {
      return 6
    }
  }
  return 0
}

//////////////////////////////
// Firing related functions //
//////////////////////////////

const rollD6 = (count: number) => {
  return Array(count)
    .fill(0)
    .map((_) => Math.ceil(Math.random() * 6))
}

const addDiceMod = (roll: number, mod: number) => {
  const newRoll = roll + mod
  if (newRoll > 6) {
    return 6
  } else if (newRoll < 1) {
    return 1
  } else {
    return newRoll
  }
}

const countHits = (
  roll: number[],
  toHit: number[],
  doubleSix: boolean
): number => {
  const reducer = (acc: number, cur: number) => {
    if (toHit.includes(cur)) {
      const newHits = doubleSix && cur === 6 ? 2 : 1
      return acc + newHits
    } else {
      return acc
    }
  }

  return roll.reduce(reducer, 0)
}
/*
 * Beam hit roll. Returns number[] with number of hits, starting from outermost layer of armor.
 */
export const beamRoll = (count: number, screen?: number) => {
  let diceLeft = count
  let rollArray = []
  while (diceLeft > 0) {
    rollArray.push(rollD6(diceLeft))
    diceLeft = rollArray
      .at(-1)
      ?.reduce((a, c) => (c === 6 ? a + 1 : a), 0) as number
  }
  // first item of array is hits to screens, rest are penetrating layers
  const toHit = screen ? [5, 6] : [4, 5, 6]
  const doubleSix = !(screen && screen === 2)
  const hits = rollArray.map((c: number[], i: number) => {
    const currentHits =
      i === 0 ? countHits(c, toHit, doubleSix) : countHits(c, [4, 5, 6], true)
    return currentHits
  })
  return hits
}

/**
 * Resolve damage to a row of armor
 * @param row armor row damaged
 * @param dmg amount of damage
 * @returns new armor row with damage applied & overflowing damage
 */
const damageToArmorRow = (row: armorRow, dmg: number): [armorRow, number] => {
  const toRegen = Math.min(row.regenLeft, dmg)
  const dmgLeftAfterRegen = dmg - toRegen > 0 ? dmg - toRegen : 0
  const toArm = Math.min(row.armorLeft, dmgLeftAfterRegen)
  const overflow = dmg - toRegen - toArm < 0 ? 0 : dmg - toRegen - toArm
  return [
    {
      ...row,
      regenLeft: row.regenLeft - toRegen,
      armorLeft: row.armorLeft - toArm,
    },
    overflow,
  ]
}
const healArmorRow = (row: armorRow) => {
  const healable = row.regen - row.regenLeft - row.regenLost
  if (healable > 0) {
    const roll = rollD6(healable)
    const lost = roll.reduce((a, c) => (c === 1 ? a + 1 : a), 0)
    const healed = roll.reduce((a, c) => (c > 4 ? a + 1 : a), 0)
    return {
      ...row,
      regenLeft: row.regenLeft + healed,
      regenLost: row.regenLost + lost,
    }
  }
  return row
}
/**
 * Resolve damage to ship's armor
 * @param armor array of armor rows to be damaged
 * @param dmg array of damage to each row
 * @returns new armor row array with damage applied & overflowing damage
 */
const damageToArmor = (
  armor: armorRow[],
  dmg: number[]
): [armorRow[], number] => {
  let mutableArmor = armor.map((row) => ({ ...row }))
  let overflow = 0
  const dmgToArmor = dmg.slice(0, armor.length)
  dmgToArmor.forEach((d: number, i: number) => {
    const [newArmorRow, newOverflow] = damageToArmorRow(
      mutableArmor[i],
      d + overflow
    )
    mutableArmor[i] = newArmorRow
    overflow = newOverflow
  })
  return [mutableArmor.map((row) => ({ ...row })), overflow]
}
/**
 * Resolve damage to a simulation ship
 * @param ship ship to be damaged
 * @param dmg array of damage
 * @returns copy of the ship with damage applied
 */
const damageToShip = (ship: simulationShip, dmg: number[]) => {
  // deal damage to armor, get new armor and overflow
  const [newArmor, overflow] = damageToArmor(ship.armor, dmg)
  // get remaining damage to hull
  let dmgToHull =
    dmg.slice(ship.armor.length).reduce((a, c) => a + c, 0) + overflow
  // assign copy of hull to mutable variable
  let newHull = [...ship.hull]
  // loop over hull layers dealing damage to them
  for (let i = 0; i < newHull.length; i++) {
    const currentDmg = Math.min(newHull[i], dmgToHull)
    newHull[i] -= currentDmg
    dmgToHull = dmgToHull - currentDmg > 0 ? dmgToHull - currentDmg : 0
  }
  // finally return new ship with damaged armor and hull
  return { ...ship, armor: newArmor, hull: newHull }
}

const resolveEndPhaseForShip = (ship: simulationShip): simulationShip => {
  const newArmor = ship.armor.map((row) => healArmorRow(row))
  // damage control phase, lost modules, reactor explosions etc. missing
  return { ...ship, armor: newArmor }
}

interface datapoint {
  name: string
  value: number
}
const categoriseData = (data: number[], averageTotal?: number) => {
  let categoryData: datapoint[] = []
  data.forEach((d, i) => {
    const exists =
      categoryData.filter((dp) => dp.name === d.toString()).length > 0
    if (exists) {
      categoryData = categoryData.map((dp) =>
        dp.name === d.toString() ? { name: dp.name, value: dp.value + 1 } : dp
      )
    } else {
      categoryData.push({ name: d.toString(), value: d })
    }
  })
  const finalData = [...categoryData]
    .sort((a, b) => parseInt(a.name) - parseInt(b.name))
    .map((dp) => ({
      ...dp,
      value: dp.value / (averageTotal ? averageTotal : 1),
    }))
  return finalData
}

const getMedian = (data: number[]) => {
  const mid = Math.floor(data.length / 2)
  const sortedData = [...data].sort((a, b) => a - b)
  const median =
    data.length % 2 !== 0
      ? sortedData[mid]
      : sortedData[mid - 1] + sortedData[mid] / 2
  return median
}

const getMode = (data: number[]) => {
  const categorised = categoriseData(data)
  const counts = categorised.map((dp) => dp.value)
  const highestCount = Math.max(...counts)
  return parseInt(categorised.filter((dp) => dp.value === highestCount)[0].name)
}

export const simulateAverageDamage = (
  target: simulationShip,
  dice: number,
  iterations: number
) => {
  let data = []
  for (let i = 0; i < iterations; i++) {
    const roll = beamRoll(dice, target.screen)
    const dmg = roll.reduce((a, c) => a + c, 0)
    data.push(dmg)
  }
  const description = `Damage ${
    target.screen > 0 ? `on lvl ${target.screen} screen` : ""
  } with ${dice} beams over ${iterations} iterations`
  const mean = data.reduce((a, c) => a + c, 0) / data.length
  const median = getMedian(data)
  const mode = getMode(data)
  const min = Math.min(...data)
  const max = Math.max(...data)
  const categoryData = categoriseData(data, iterations)

  return {
    description: description,
    mean: mean,
    median: median,
    mode: mode,
    min: min,
    max: max,
    data: categoryData,
  }
}

export const simulateRoundsToKill = (
  target: simulationShip,
  dice: number,
  iterations: number
) => {
  let rounds = []
  for (let i = 0; i < iterations; i++) {
    let ship = { ...target }
    let currentRounds = 0
    while (ship.hull.reduce((a, c) => a + c, 0) > 0) {
      const roll = beamRoll(dice, target.screen)
      ship = damageToShip(ship, roll)
      ship = resolveEndPhaseForShip(ship)
      currentRounds += 1
      //console.log(`iteration ${i}: ship after ${currentRounds} rounds `, ship)
    }
    rounds.push(currentRounds)
  }
  const description = `Rounds to kill target with ${dice} beams in ${iterations} iterations`
  const mean = rounds.reduce((a, c) => a + c, 0) / rounds.length
  const median = getMedian(rounds)
  const mode = getMode(rounds)
  const min = Math.min(...rounds)
  const max = Math.max(...rounds)
  const categoryData = categoriseData(rounds, iterations)
  console.log(categoryData)
  return {
    description: description,
    mean: mean,
    median: median,
    mode: mode,
    min: min,
    max: max,
    data: categoryData,
  }
}
