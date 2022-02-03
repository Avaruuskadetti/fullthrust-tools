export interface weaponClass {
  value: string
  label: string
  arcs: string[]
}
export interface weaponVariant {
  value: string
  label: string
}
export interface weapon {
  id: number
  value: string
  label: string
  arcs: string
  class: string
  variant?: string
  count: number
}
export interface weaponBlueprint {
  points: (weapon: weapon, ship?: any) => number
  mass: (weapon: weapon, ship?: any) => number
  value: string
  label: string
  classes: weaponClass[]
  variants?: weaponVariant[]
}
export const getWeaponBlueprint = (value: string): weaponBlueprint =>
  weaponBlueprints.filter((bp) => bp.value === value)[0]

/* Helper functions to construct weapon scoring functions */
const calcMass = (
  base: number,
  arcMultiplier: number,
  arcs: string | undefined,
  count: number | undefined
): number =>
  arcs && count ? (base + arcMultiplier * parseInt(arcs)) * count : 0

const calcPoints = (
  base: number,
  arcMultiplier: number,
  pointMultiplier: number,
  arcs: string | undefined,
  count: number | undefined,
  extra: number = 0
): number =>
  arcs && count
    ? ((base + arcMultiplier * parseInt(arcs)) * pointMultiplier + extra) *
      count
    : 0

export const weaponBlueprints: weaponBlueprint[] = [
  {
    value: "beam",
    label: "Beam",
    classes: [
      { value: "1", label: "1", arcs: ["6"] },
      { value: "2", label: "2", arcs: ["3", "6", "BS"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "5", label: "5", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (beam: weapon) => {
      if (beam.class && beam.arcs && beam.count) {
        if (beam.class === "1") {
          return 3 * beam.count
        }
        if (beam.class === "2" && beam.arcs !== "BS") {
          return (beam.arcs === "6" ? 9 : 6) * beam.count
        }
        if (beam.class === "2" && beam.arcs === "BS") {
          return beam.count * 3
        }
        if (beam.class === "3") {
          return (3 + parseInt(beam.arcs)) * 3 * beam.count
        }
        if (beam.class === "4") {
          return (6 + 2 * parseInt(beam.arcs)) * 3 * beam.count
        }
        if (beam.class === "5") {
          return (12 + 4 * parseInt(beam.arcs)) * 3 * beam.count
        }
      }
      return 0
    },
    mass: (beam: weapon) => {
      if (beam.class && beam.arcs && beam.count) {
        if (beam.class === "1") {
          return 1 * beam.count
        }
        if (beam.class === "2" && beam.arcs !== "BS") {
          return (beam.arcs === "6" ? 3 : 2) * beam.count
        }
        if (beam.class === "2" && beam.arcs === "BS") {
          return beam.count
        }
        if (beam.class === "3") {
          return (3 + parseInt(beam.arcs)) * beam.count
        }
        if (beam.class === "4") {
          return (6 + 2 * parseInt(beam.arcs)) * beam.count
        }
        if (beam.class === "5") {
          return (12 + 4 * parseInt(beam.arcs)) * beam.count
        }
      }
      return 0
    },
  },
  {
    value: "emp",
    label: "EMP Projector",
    classes: [
      { value: "1", label: "1", arcs: ["6"] },
      { value: "2", label: "2", arcs: ["3", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (emp: weapon) => {
      if (emp.class && emp.arcs && emp.count) {
        if (emp.class === "1") {
          return 3 * emp.count
        }
        if (emp.class === "2") {
          return (emp.arcs === "6" ? 9 : 6) * emp.count
        }
        if (emp.class === "3") {
          return (3 + parseInt(emp.arcs)) * 3 * emp.count
        }
        if (emp.class === "4") {
          return (6 + 2 * parseInt(emp.arcs)) * 3 * emp.count
        }
      }
      return 0
    },
    mass: (emp: weapon) => {
      if (emp.class && emp.arcs && emp.count) {
        if (emp.class === "1") {
          return 1 * emp.count
        }
        if (emp.class === "2") {
          return (emp.arcs === "6" ? 3 : 2) * emp.count
        }
        if (emp.class === "3") {
          return (3 + parseInt(emp.arcs)) * emp.count
        }
        if (emp.class === "4") {
          return (6 + 2 * parseInt(emp.arcs)) * emp.count
        }
      }
      return 0
    },
  },
  {
    value: "plasmaCannon",
    label: "Plasma Cannon",
    classes: [
      { value: "1", label: "1", arcs: ["3", "6"] },
      { value: "2", label: "2", arcs: ["3", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs === "6" ? 6 : 3) * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 18 : 12) * w.count
        }
        if (w.class === "3") {
          return (6 + 2 * parseInt(w.arcs)) * 3 * w.count
        }
        if (w.class === "4") {
          return (12 + 4 * parseInt(w.arcs)) * 3 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs === "6" ? 2 : 1) * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 6 : 4) * w.count
        }
        if (w.class === "3") {
          return (6 + 2 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "4") {
          return (12 + 4 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "standardGraser",
    label: "Graser (standard)",
    classes: [
      { value: "1", label: "1", arcs: ["3", "6"] },
      { value: "2", label: "2", arcs: ["3", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs === "6" ? 6 : 3) * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 18 : 12) * w.count
        }
        if (w.class === "3") {
          return (6 + 2 * parseInt(w.arcs)) * 3 * w.count
        }
        if (w.class === "4") {
          return (12 + 4 * parseInt(w.arcs)) * 3 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs === "6" ? 2 : 1) * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 6 : 4) * w.count
        }
        if (w.class === "3") {
          return (6 + 2 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "4") {
          return (12 + 4 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "heavyGraser",
    label: "Graser (heavy)",
    classes: [
      { value: "1", label: "1", arcs: ["1", "3", "6"] },
      { value: "2", label: "2", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs !== "1" ? (w.arcs === "6" ? 4 : 3) : 2) * 3 * w.count
        }
        if (w.class === "2") {
          return (6 + 3 * parseInt(w.arcs)) * 3 * w.count
        }
        if (w.class === "3") {
          return (18 + 6 * parseInt(w.arcs)) * 3 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs !== "1" ? (w.arcs === "6" ? 4 : 3) : 2) * w.count
        }
        if (w.class === "2") {
          return (6 + 3 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "3") {
          return (18 + 6 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "hiIntGraser",
    label: "Graser (high-intensity)",
    classes: [
      { value: "1", label: "1", arcs: ["1", "3", "6"] },
      { value: "2", label: "2", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs !== "1" ? (w.arcs === "6" ? 4 : 3) : 2) * 4 * w.count
        }
        if (w.class === "2") {
          return (6 + 3 * parseInt(w.arcs)) * 4 * w.count
        }
        if (w.class === "3") {
          return (18 + 6 * parseInt(w.arcs)) * 4 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs !== "1" ? (w.arcs === "6" ? 4 : 3) : 2) * w.count
        }
        if (w.class === "2") {
          return (6 + 3 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "3") {
          return (18 + 6 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "phaser",
    label: "Phaser",
    classes: [
      { value: "1", label: "1", arcs: ["3", "6"] },
      { value: "2", label: "2", arcs: ["3", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon, ship: any) => {
      const hasAFC =
        ship.systems.filter((s: any) => s.value === "advFirecon").length > 0
      if (w.class && w.arcs && w.count) {
        if (w.class === "1" && !hasAFC) {
          return (w.arcs === "6" ? 8 : 5) * w.count
        }
        if (w.class === "1" && hasAFC) {
          return (w.arcs === "6" ? 14 : 8) * w.count
        }
        if (w.class === "2" && !hasAFC) {
          return (w.arcs === "6" ? 20 : 14) * w.count
        }
        if (w.class === "2" && hasAFC) {
          return (w.arcs === "6" ? 38 : 26) * w.count
        }
        if (w.class === "3" && !hasAFC) {
          return ((6 + 2 * parseInt(w.arcs)) * 3 + 2) * w.count
        }
        if (w.class === "3" && hasAFC) {
          return ((6 + 2 * parseInt(w.arcs)) * 6 + 2) * w.count
        }
        if (w.class === "4" && !hasAFC) {
          return ((12 + 4 * parseInt(w.arcs)) * 3 + 2) * w.count
        }
        if (w.class === "4" && hasAFC) {
          return ((12 + 4 * parseInt(w.arcs)) * 6 + 2) * w.count
        }
      }
      return 0
    },
    mass: (w: weapon, ship: any) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return (w.arcs === "6" ? 2 : 1) * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 6 : 4) * w.count
        }
        if (w.class === "3") {
          return (6 + 2 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "4") {
          return (12 + 4 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "transporterBeam",
    label: "Transporter Beam",
    classes: [
      { value: "1", label: "1", arcs: ["6"] },
      { value: "2", label: "2", arcs: ["3", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "5", label: "5", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return 3 * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 9 : 6) * w.count
        }
        if (w.class === "3") {
          return (3 + parseInt(w.arcs)) * 3 * w.count
        }
        if (w.class === "4") {
          return (6 + 2 * parseInt(w.arcs)) * 3 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return 1 * w.count
        }
        if (w.class === "2") {
          return (w.arcs === "6" ? 3 : 2) * w.count
        }
        if (w.class === "3") {
          return (3 + parseInt(w.arcs)) * w.count
        }
        if (w.class === "4") {
          return (6 + 2 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "gatlingBattery",
    label: "Gatling Battery",
    classes: [{ value: "none", label: "none", arcs: ["1", "3", "6", "2xBS"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "3":
            return 12 * w.count
          case "6":
            return 16 * w.count
          case "4BS":
            return 20 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 2 * w.count
          case "3":
            return 3 * w.count
          case "6":
            return 4 * w.count
          case "4BS":
            return 5 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "twinParticleArray",
    label: "Twin Particle Array",
    classes: [{ value: "none", label: "none", arcs: ["1", "3", "6", "2xBS"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "3":
            return 12 * w.count
          case "6":
            return 16 * w.count
          case "4BS":
            return 20 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 2 * w.count
          case "3":
            return 3 * w.count
          case "6":
            return 4 * w.count
          case "4BS":
            return 5 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "mesonProjector",
    label: "Meson Projector",
    classes: [{ value: "none", label: "none", arcs: ["1", "3", "6", "2xBS"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "3":
            return 12 * w.count
          case "6":
            return 16 * w.count
          case "4BS":
            return 20 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 2 * w.count
          case "3":
            return 3 * w.count
          case "6":
            return 4 * w.count
          case "4BS":
            return 5 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "needleBeam",
    label: "Needle Beam",
    classes: [
      { value: "1", label: "1", arcs: ["2", "3"] },
      { value: "2", label: "2", arcs: ["1", "2", "3"] },
      { value: "3", label: "3", arcs: ["1", "2", "3"] },
      { value: "4", label: "4", arcs: ["1", "2", "3"] },
    ],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return parseInt(w.arcs) * 3 * w.count
        }
        if (w.class === "2") {
          return (2 + 2 * parseInt(w.arcs)) * 3 * w.count
        }
        if (w.class === "3") {
          return (4 + 4 * parseInt(w.arcs)) * 3 * w.count
        }
        if (w.class === "4") {
          return (8 + 8 * parseInt(w.arcs)) * 3 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        if (w.class === "1") {
          return parseInt(w.arcs) * w.count
        }
        if (w.class === "2") {
          return (2 + 2 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "3") {
          return (4 + 4 * parseInt(w.arcs)) * w.count
        }
        if (w.class === "4") {
          return (8 + 8 * parseInt(w.arcs)) * w.count
        }
      }
      return 0
    },
  },
  {
    value: "shortRangePulseTorpedo",
    label: "Pulse Torpedo (SR)",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 6 * w.count
          case "2":
            return 9 * w.count
          case "3":
            return 12 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 2 * w.count
          case "2":
            return 3 * w.count
          case "3":
            return 4 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "mediumRangePulseTorpedo",
    label: "Pulse Torpedo (MR)",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 12 * w.count
          case "2":
            return 15 * w.count
          case "3":
            return 18 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 4 * w.count
          case "2":
            return 5 * w.count
          case "3":
            return 6 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "longRangePulseTorpedo",
    label: "Pulse Torpedo (LR)",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 24 * w.count
          case "2":
            return 30 * w.count
          case "3":
            return 36 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "2":
            return 10 * w.count
          case "3":
            return 12 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "shortRangePulseTorpedoOverload",
    label: "Pulse Torpedo (SR OL)",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "2":
            return 12 * w.count
          case "3":
            return 16 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 2 * w.count
          case "2":
            return 3 * w.count
          case "3":
            return 4 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "mediumRangePulseTorpedoOverload",
    label: "Pulse Torpedo (MR OL)",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 16 * w.count
          case "2":
            return 20 * w.count
          case "3":
            return 24 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 4 * w.count
          case "2":
            return 5 * w.count
          case "3":
            return 6 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "longRangePulseTorpedoOverload",
    label: "Pulse Torpedo (LR OL)",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 32 * w.count
          case "2":
            return 40 * w.count
          case "3":
            return 48 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "2":
            return 10 * w.count
          case "3":
            return 12 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "variablePulseTorpedo",
    label: "Pulse Torpedo (variable)",
    classes: [{ value: "1", label: "1", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 40 * w.count
          case "2":
            return 50 * w.count
          case "3":
            return 60 * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.arcs) {
          case "1":
            return 8 * w.count
          case "2":
            return 10 * w.count
          case "3":
            return 12 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "turretedSubmunition",
    label: "Turreted Submunition Pack",
    classes: [{ value: "none", label: "none", arcs: ["3"] }],
    points: (w: weapon) => (w.count ? 3 * w.count : 0),
    mass: (w: weapon) => (w.count ? 1 * w.count : 0),
  },
  {
    value: "kGun",
    label: "K-Gun",
    classes: [
      { value: "MR-1", label: "MR-1", arcs: ["6"] },
      { value: "MR-2", label: "MR-2", arcs: ["1", "2"] },
      { value: "MR-3", label: "MR-3", arcs: ["1"] },
      { value: "MR-4", label: "MR-4", arcs: ["1"] },
      { value: "MR-5", label: "MR-5", arcs: ["1"] },
      { value: "MR-6", label: "MR-6", arcs: ["1"] },
      { value: "SR-1", label: "SR-1", arcs: ["6"] },
      { value: "SR-2", label: "SR-2", arcs: ["2"] },
      { value: "SR-3", label: "SR-3", arcs: ["1"] },
      { value: "SR-4", label: "SR-4", arcs: ["1"] },
      { value: "SR-5", label: "SR-5", arcs: ["1"] },
      { value: "SR-6", label: "SR-6", arcs: ["1"] },
      { value: "LR-1", label: "LR-1", arcs: ["6"] },
      { value: "LR-2", label: "LR-2", arcs: ["1", "2"] },
      { value: "LR-3", label: "LR-3", arcs: ["1"] },
      { value: "LR-4", label: "LR-4", arcs: ["1"] },
      { value: "LR-5", label: "LR-5", arcs: ["1"] },
      { value: "LR-6", label: "LR-6", arcs: ["1"] },
    ],
    variants: [
      { value: "standard", label: "Standard" },
      { value: "flak", label: "Flak" },
    ],
    points: (w: weapon) => {
      const pf = 4
      const flak = w.variant === "flak" ? 2 : 0
      if (w.class && w.arcs && w.count) {
        switch (w.class) {
          case "MR-1":
            return (2 * pf + flak) * w.count
          case "MR-2":
            return ((2 + 1 * parseInt(w.arcs)) * pf + flak) * w.count
          case "MR-3":
            return (5 * pf + flak) * w.count
          case "MR-4":
            return (8 * pf + flak) * w.count
          case "MR-5":
            return (11 * pf + flak) * w.count
          case "MR-6":
            return (14 * pf + flak) * w.count
          case "SR-1":
            return (1.5 * pf + flak) * w.count
          case "SR-2":
            return (2 * pf + flak) * w.count
          case "SR-3":
            return (3 * pf + flak) * w.count
          case "SR-4":
            return (4 * pf + flak) * w.count
          case "SR-5":
            return (6 * pf + flak) * w.count
          case "SR-6":
            return (7 * pf + flak) * w.count
          case "LR-1":
            return (4 * pf + flak) * w.count
          case "LR-2":
            return ((4 + 2 * parseInt(w.arcs)) * pf + 2) * w.count
          case "LR-3":
            return (10 * pf + 2) * w.count
          case "LR-4":
            return (16 * pf + 2) * w.count
          case "LR-5":
            return (22 * pf + 2) * w.count
          case "LR-6":
            return (28 * pf + 2) * w.count
        }
      }
      return 0
    },
    mass: (w: weapon) => {
      if (w.class && w.arcs && w.count) {
        switch (w.class) {
          case "MR-1":
            return 2 * w.count
          case "MR-2":
            return (2 + 1 * parseInt(w.arcs)) * w.count
          case "MR-3":
            return 5 * w.count
          case "MR-4":
            return 8 * w.count
          case "MR-5":
            return 11 * w.count
          case "MR-6":
            return 14 * w.count
          case "SR-1":
            return 1.5 * w.count
          case "SR-2":
            return 2 * w.count
          case "SR-3":
            return 3 * w.count
          case "SR-4":
            return 4 * w.count
          case "SR-5":
            return 6 * w.count
          case "SR-6":
            return 7 * w.count
          case "LR-1":
            return 4 * w.count
          case "LR-2":
            return (4 + 2 * parseInt(w.arcs)) * w.count
          case "LR-3":
            return 10 * w.count
          case "LR-4":
            return 16 * w.count
          case "LR-5":
            return 22 * w.count
          case "LR-6":
            return 28 * w.count
        }
      }
      return 0
    },
  },
  {
    value: "multipleKineticPenetrator",
    label: "Multiple Kinetic Penetrator",
    classes: [{ value: "none", label: "none", arcs: ["1"] }],
    points: (w: weapon) => (w.count ? 4 * w.count : 0),
    mass: (w: weapon) => (w.count ? 1 * w.count : 0),
  },
  {
    value: "fusionArray",
    label: "Fusion Array",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      return calcPoints(2, 1, 3, w.arcs, w.count)
    },
    mass: (w: weapon) => {
      return calcMass(2, 1, w.arcs, w.count)
    },
  },
  {
    value: "graviticGun",
    label: "Gravitic Gun",
    classes: [
      { value: "1", label: "1", arcs: ["6"] },
      { value: "2", label: "2", arcs: ["3", "6"] },
      { value: "3", label: "3", arcs: ["1", "2", "3", "4", "5", "6"] },
      { value: "4", label: "4", arcs: ["1", "2", "3", "4", "5", "6"] },
    ],
    points: (w: weapon) => {
      switch (w.class) {
        case "1":
          return 3 * w.count
        case "2":
          return (w.arcs && w.arcs === "3" ? 6 : 9) * w.count
        case "3":
          return calcPoints(3, 1, 3, w.arcs, w.count)
        case "4":
          return calcPoints(6, 2, 3, w.arcs, w.count)
        default:
          return 0
      }
    },
    mass: (w: weapon) => {
      return calcMass(2, 1, w.arcs, w.count)
    },
  },
  {
    value: "pulser",
    label: "Pulser",
    classes: [{ value: "none", label: "none", arcs: ["1", "2", "3"] }],
    points: (w: weapon) => {
      switch (w.arcs) {
        case "1":
          return 10 * w.count
        case "2":
          return 15 * w.count
        case "3":
          return 20 * w.count
        default:
          return 0
      }
    },
    mass: (w: weapon) => {
      switch (w.arcs) {
        case "1":
          return 2 * w.count
        case "2":
          return 3 * w.count
        case "3":
          return 4 * w.count
        default:
          return 0
      }
    },
  },
  {
    value: "plasmaBoltLauncher",
    label: "Plasma Bolt Launcher",
    classes: [
      { value: "1", label: "1", arcs: ["1", "2", "3"] },
      { value: "2", label: "2", arcs: ["1", "2", "3"] },
      { value: "3", label: "3", arcs: ["1", "2", "3"] },
      { value: "4", label: "4", arcs: ["1", "2", "3"] },
      { value: "5", label: "5", arcs: ["1", "2", "3"] },
      { value: "6", label: "6", arcs: ["1", "2", "3"] },
    ],
    points: (w: weapon) => {
      switch (w.class) {
        case "1":
          return calcPoints(2, 1, 3, w.arcs, w.count)
        case "2":
          return calcPoints(4, 2, 3, w.arcs, w.count)
        case "3":
          return calcPoints(6, 3, 3, w.arcs, w.count)
        case "4":
          return calcPoints(8, 4, 3, w.arcs, w.count)
        case "5":
          return calcPoints(10, 5, 3, w.arcs, w.count)
        case "6":
          return calcPoints(12, 6, 3, w.arcs, w.count)
        default:
          return 0
      }
    },
    mass: (w: weapon) => {
      switch (w.class) {
        case "1":
          return calcMass(2, 1, w.arcs, w.count)
        case "2":
          return calcMass(4, 2, w.arcs, w.count)
        case "3":
          return calcMass(6, 3, w.arcs, w.count)
        case "4":
          return calcMass(8, 4, w.arcs, w.count)
        case "5":
          return calcMass(10, 5, w.arcs, w.count)
        case "6":
          return calcMass(12, 6, w.arcs, w.count)
        default:
          return 0
      }
    },
  },
]
/*
Boarding torpedo launcher is in ordnance instead
*/
