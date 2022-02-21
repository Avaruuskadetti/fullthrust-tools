export interface gunboat {
  groups: number
  id: number
  mods: string[]
  type: string
}
export const gunboats = {
  types: [
    { value: "beam", label: "Beam", points: 6 * 9 },
    { value: "plasmaGun", label: "Plasma Gun", points: 6 * 9 },
    { value: "graser", label: "Graser", points: 6 * 9 },
    { value: "gatling", label: "Gatling", points: 6 * 15 },
    { value: "needle", label: "Needle", points: 6 * 9 },
    { value: "pulseTorp", label: "Pulse Torpedo", points: 6 * 12 },
    { value: "submunition", label: "Submunition", points: 6 * 12 },
    { value: "mkp", label: "MKP", points: 6 * 15 },
    { value: "kGun", label: "K-Gun", points: 6 * 12 },
    { value: "missile", label: "Missile", points: 6 * 12 },
    { value: "rocket", label: "Rocket", points: 6 * 12 },
    { value: "pointDefense", label: "Point Defense", points: 6 * 9 },
    { value: "areaDefense", label: "Area Defense", points: 6 * 12 },
    { value: "scatterpack", label: "Scatterpack", points: 6 * 15 },
    { value: "plasmaBomber", label: "Plasma Bomber", points: 6 * 15 },
  ],
  mods: [
    { value: "heavyScreened", label: "Heavy/Screened", points: 12 },
    { value: "electronicWarfare", label: "Electronic Warfare", points: 12 },
  ],
}
