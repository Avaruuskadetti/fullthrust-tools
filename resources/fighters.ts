export interface fighter {
  groups: number
  id: number
  mods: string[]
  type: string
}

export const fighters = {
  types: [
    { value: "standard", label: "Standard", points: 18 },
    { value: "interceptor", label: "Interceptor", points: 18 },
    { value: "attack", label: "Attack", points: 24 },
    { value: "torpedo", label: "Torpedo", points: 36 },
    { value: "graser", label: "Graser", points: 42 },
    { value: "plasma", label: "Plasma", points: 42 },
    { value: "mkp", label: "MKP", points: 36 },
    { value: "missile", label: "Missile", points: 24 },
    { value: "multirole", label: "Multirole", points: 30 },
    { value: "lightStandard", label: "Light standard", points: 18 },
    { value: "lightInterceptor", label: "Light interceptor", points: 24 },
    { value: "lightAttack", label: "Light attack", points: 24 },
    { value: "assault", label: "Assault shuttle", points: 6 },
  ],
  mods: [
    { value: "fast", label: "fast", points: 6 },
    { value: "long", label: "long range", points: 6 },
    { value: "heavy", label: "heavy", points: 18 },
    { value: "ftl", label: "FTL", points: 6 },
    { value: "robot", label: "robot", points: -6 },
  ],
}
