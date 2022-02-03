export interface spinalmount {
  id: number
  value: string
  label: string
  count: number
  mass: number
}
export interface spinalmountBlueprint {
  value: string
  label: string
  points: (arg0: spinalmount) => number
}

export const getSpinalBlueprint = (value: string): spinalmountBlueprint => {
  const found = spinalmountBlueprints.filter((sm) => sm.value === value)[0]
  return found
}

export const spinalmountClasses = [
  { value: "8", label: "Small (8 mass)" },
  { value: "16", label: "Medium (16 mass)" },
  { value: "24", label: "Large (24 mass)" },
]

export const spinalLimits = {
  maxPerMassUnit: 16,
  massUnit: 50,
}

export const spinalmountBlueprints: spinalmountBlueprint[] = [
  {
    value: "pointSingularityProjector",
    label: "Point Singularity Projector",
    points: (s: spinalmount) => s.mass * 5 * s.count,
  },
  {
    value: "spinalBeam",
    label: "Beam Spinal Mount",
    points: (s: spinalmount) => s.mass * 4 * s.count,
  },
  {
    value: "spinalPlasma",
    label: "Plasma Spinal Mount",
    points: (s: spinalmount) => s.mass * 4 * s.count,
  },
]
