import { turn, order, position, simShip } from "./interfaces"
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
// THIS WORKS NOW!
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

export const getPossibleOrders = (ship: simShip): order[] => {
  const maxCourseChange = settings.roundCourseChangeUp
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
export const getPossiblePositions = (ship: simShip) => {
  const possibleOrders = getPossibleOrders(ship)
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

// Returns array with original rolls[] at 0, rerolls[] at 1
// Doesn't work right
export const rollWithCrits = (count: number): number[][] => {
  const roll = rollD6(count)
  console.log(`rolled with ${count} dice:`, roll)
  const rerollCount = roll.filter((x) => x === 6).length
  console.log(`rerolling with ${rerollCount} dice.`)
  const reroll = rerollCount > 0 ? rollWithCrits(rerollCount) : []
  console.log([roll, reroll.flat()])
  return [roll, reroll.flat()]
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

const beamDice = (
  count: number,
  modifier?: number,
  hits: number[] = [4, 5, 6],
  reroll: boolean
) => {
  // TODO STILL
  if (reroll) {
    const roll = rollWithCrits(count)
    const hitCount = roll[0].filter((r) => hits.includes(r))
    const critCount = 0
  } else {
    const roll = rollD6(count)
  }
}
