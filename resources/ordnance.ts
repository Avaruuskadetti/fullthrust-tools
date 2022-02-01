export interface salvo {
  value: string
  label: string
  count: number
}
export interface missileVariant {
  value: string
  label: string
}
export interface ordnance {
  id: number
  value: string
  label: string
  count: number
  magazine?: salvo[]
  variant?: missileVariant
}
export interface ordnanceBlueprint {
  value: string
  label: string
  magazine?: boolean
  variants: missileVariant[]
  points: (o: ordnance) => number
  mass: (o: ordnance) => number
}

/* Functions related to individual blueprints */
const salvoLauncherMass = (o: ordnance) => {
  const launcherMass = o.count * 3
  const magazineMass = o.magazine
    ? o.magazine?.reduce((acc, curr) => {
        const massFactor = curr.value === "std" ? 2 : 3
        return acc + curr.count * massFactor
      }, 0)
    : 0
  return launcherMass + magazineMass
}
const boardingTorpedoMass = (o: ordnance) => {
  const launcherMass = o.count * 2
  const magazineMass = o.magazine
    ? o.magazine?.reduce((acc, curr) => acc + curr.count, 0)
    : 0
  return launcherMass + magazineMass
}
const heavyMissileMass = (o: ordnance) => {
  if (o.variant) {
    switch (o.variant.value) {
      case "std":
        return 2 * o.count
      case "ext":
        return 3 * o.count
      case "twoStageStd":
        return 4 * o.count
      case "twoStageExt":
        return 5 * o.count
    }
  }
  return 0
}

export const getOrdnanceBlueprint = (value: string): ordnanceBlueprint =>
  ordnanceBlueprints.filter((bp) => bp.value === value)[0]

/* MAIN BLUEPRINT BASE */
export const ordnanceBlueprints: ordnanceBlueprint[] = [
  {
    value: "salvoLauncher",
    label: "Salvo Missile Launcher",
    magazine: true,
    variants: [
      { value: "std", label: "Standard" },
      { value: "ext", label: "Extended" },
    ],
    points: (o: ordnance) => salvoLauncherMass(o) * 3,
    mass: salvoLauncherMass,
  },
  {
    value: "salvoRack",
    label: "Salvo Missile Rack",
    variants: [
      { value: "std", label: "Standard range" },
      { value: "ext", label: "Extended range" },
    ],
    points: (o: ordnance) =>
      o.variant && o.variant.value === "std" ? o.count * 12 : o.count * 15,
    mass: (o: ordnance) =>
      o.variant && o.variant.value === "std" ? o.count * 4 : o.count * 5,
  },
  {
    value: "heavyMissile",
    label: "Heavy Missile",
    variants: [
      { value: "std", label: "Standard range" },
      { value: "ext", label: "Extended range" },
      { value: "twoStageStd", label: "Two stage standard range" },
      { value: "twoStageExt", label: "Two stage extended range" },
    ],
    points: (o: ordnance) => heavyMissileMass(o) * 3,
    mass: (o: ordnance) => heavyMissileMass(o),
  },
  {
    value: "antimatterMissile",
    label: "Anti-matter Missile",
    variants: [{ value: "std", label: "Standard" }],
    points: (o: ordnance) => 10 * o.count,
    mass: (o: ordnance) => 2 * o.count,
  },
  {
    value: "rocketPod",
    label: "Rocket Pod",
    variants: [{ value: "std", label: "Standard" }],
    points: (o: ordnance) => 3 * o.count,
    mass: (o: ordnance) => 1 * o.count,
  },
  {
    value: "minelayer",
    label: "Mine Layer",
    magazine: true,
    variants: [{ value: "mines", label: "Mines (in total)" }],
    points: (o: ordnance) => 1,
    mass: (o: ordnance) => {
      const magazineMass = o.magazine
        ? o.magazine?.reduce((acc, curr) => acc + curr.count, 0)
        : 0
      return 2 * o.count + magazineMass
    },
  },
  {
    value: "boardingTorpedoLauncher",
    label: "Boarding Torpedo Launcher",
    magazine: true,
    variants: [{ value: "std", label: "Torpedoes (in total)" }],
    points: (o: ordnance) => boardingTorpedoMass(o) * 3,
    mass: boardingTorpedoMass,
  },
]
