import { asPoints } from "../logic/helpers"
import { ship } from "./ship"
const getSystemFromShip = (ship: any, system: string) =>
  ship.systems.filter((s: any) => s.value === system)[0]

const shipComponents = [
  {
    value: "sensors",
    label: "Sensors",
    type: "options",
    options: ["enhanced", "superior"],
    mass: (ship: any) =>
      getSystemFromShip(ship, "sensors").version === "enhanced" ? 2 : 4,
    points: (ship: any) =>
      getSystemFromShip(ship, "sensors").version === "enhanced" ? 8 : 16,
  },
  {
    value: "ortillery",
    label: "Ortillery system",
    type: "single",
    mass: (ship: any) => 3,
    points: (ship: any) => 9,
  },
  {
    value: "minesweeper",
    label: "Minesweeper system",
    type: "single",
    mass: (ship: any) => 5,
    points: (ship: any) => 15,
  },
  {
    value: "pds",
    label: "PDS",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "pds").count,
    points: (ship: any) => getSystemFromShip(ship, "pds").count * 3,
  },
  {
    value: "weaselEmitter",
    label: "Weasel Emitter",
    type: "options",
    options: ["cruiser", "capital"],
    mass: (ship: any) =>
      getSystemFromShip(ship, "weaselEmitter").version === "cruiser" ? 2 : 4,
    points: (ship: any) =>
      getSystemFromShip(ship, "weaselEmitter").version === "cruiser" ? 8 : 16,
  },
  {
    value: "firecon",
    label: "FireCon",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "firecon").count,
    points: (ship: any) => getSystemFromShip(ship, "firecon").count * 4,
  },
  {
    value: "advFirecon",
    label: "FireCon (Advanced)",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "advFirecon").count,
    points: (ship: any) => getSystemFromShip(ship, "advFirecon").count * 5,
  },
  {
    value: "adfc",
    label: "ADFC",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "adfc").count * 2,
    points: (ship: any) => getSystemFromShip(ship, "adfc").count * 8,
  },
  {
    value: "advAdfc",
    label: "ADFC (Advanced)",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "advAdfc").count * 2,
    points: (ship: any) => getSystemFromShip(ship, "advAdfc").count * 10,
  },
  {
    value: "screen",
    label: "Screen Generator",
    type: "options",
    options: ["standard 1", "standard 2", "advanced 1", "advanced 2"],
    mass: (ship: any) => {
      switch (getSystemFromShip(ship, "screen").version) {
        case "standard 1":
          return asPoints(0.05 * ship.mass)
        case "standard 2":
          return asPoints(0.1 * ship.mass)
        case "advanced 1":
          return asPoints(0.075 * ship.mass)
        case "advanced 2":
          return asPoints(0.15 * ship.mass)
      }
    },
    points: (ship: any) => {
      switch (getSystemFromShip(ship, "screen").version) {
        case "standard 1":
          return asPoints(0.05 * ship.mass) * 3
        case "standard 2":
          return asPoints(0.1 * ship.mass) * 3
        case "advanced 1":
          return asPoints(0.075 * ship.mass) * 4
        case "advanced 2":
          return asPoints(0.15 * ship.mass) * 4
      }
    },
  },
  {
    value: "areaScreen",
    label: "Area Screen Generator",
    type: "options",
    options: ["standard 1", "standard 2", "advanced 1", "advanced 2"],
    mass: (ship: any) => {
      switch (getSystemFromShip(ship, "areaScreen").version) {
        case "standard 1":
          return asPoints(Math.max(0.2 * ship.mass, 15))
        case "standard 2":
          return asPoints(Math.max(0.4 * ship.mass, 30))
        case "advanced 1":
          return asPoints(Math.max(0.3 * ship.mass, 20))
        case "advanced 2":
          return asPoints(Math.max(0.6 * ship.mass, 40))
      }
    },
    points: (ship: any) => {
      switch (getSystemFromShip(ship, "areaScreen").version) {
        case "standard 1":
          return asPoints(Math.max(0.7 * ship.mass, 15 * 3.5))
        case "standard 2":
          return asPoints(Math.max(1.4 * ship.mass, 30 * 3.5))
        case "advanced 1":
          return asPoints(Math.max(1.05 * ship.mass, 20 * 3.5))
        case "advanced 2":
          return asPoints(Math.max(2.1 * ship.mass, 40 * 3.5))
      }
    },
  },
  {
    value: "cloaking",
    label: "Cloaking device/field",
    type: "options",
    options: ["device", "field"],
    mass: (ship: any) => 1,
    points: (ship: any) => {
      switch (getSystemFromShip(ship, "cloaking").version) {
        case "device":
          return ship.mass / 2
        case "field":
          return ship.mass
      }
    },
  },
  {
    value: "stealthFields",
    label: "Stealth fields",
    type: "options",
    options: ["lvl 1", "lvl 2"],
    mass: (ship: any) =>
      getSystemFromShip(ship, "stealthFields").version === "lvl 2"
        ? asPoints(0.1 * ship.mass)
        : asPoints(0.05 * ship.mass),
    points: (ship: any) =>
      getSystemFromShip(ship, "stealthFields").version === "lvl 2"
        ? asPoints(0.6 * ship.mass)
        : asPoints(0.3 * ship.mass),
  },
  {
    value: "holofield",
    label: "Holofield",
    type: "single",
    mass: (ship: any) => asPoints(0.1 * ship.mass),
    points: (ship: any) => asPoints(0.5 * ship.mass),
  },
  {
    value: "scattergun",
    label: "Scattergun",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "scattergun").count,
    points: (ship: any) => getSystemFromShip(ship, "scattergun").count * 5,
  },
  {
    value: "grapeshot",
    label: "Grapeshot",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "grapeshot").count,
    points: (ship: any) => getSystemFromShip(ship, "grapeshot").count * 4,
  },
  {
    value: "ecm",
    label: "ECM",
    type: "options",
    options: ["lvl 1", "lvl 2", "lvl 3"],
    mass: (ship: any) => {
      switch (getSystemFromShip(ship, "ecm").version) {
        case "lvl 3":
          return 3
        case "lvl 2":
          return 2
        case "lvl 1":
          return 1
      }
    },
    points: (ship: any) => {
      switch (getSystemFromShip(ship, "ecm").version) {
        case "lvl 3":
          return 9
        case "lvl 2":
          return 6
        case "lvl 1":
          return 3
      }
    },
  },
  {
    value: "areaEcm",
    label: "Area ECM",
    type: "options",
    options: ["lvl 1", "lvl 2", "lvl 3"],
    mass: (ship: any) => {
      switch (getSystemFromShip(ship, "areaEcm").version) {
        case "lvl 3":
          return 6
        case "lvl 2":
          return 4
        case "lvl 1":
          return 2
      }
    },
    points: (ship: any) => {
      switch (getSystemFromShip(ship, "areaEcm").version) {
        case "lvl 3":
          return 18
        case "lvl 2":
          return 12
        case "lvl 1":
          return 6
      }
    },
  },
  {
    value: "ads3",
    label: "ADS (3-arc)",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "ads3").count * 2,
    points: (ship: any) => getSystemFromShip(ship, "ads3").count * 6,
  },
  {
    value: "ads6",
    label: "ADS (6-arc)",
    type: "multiple",
    mass: (ship: any) => getSystemFromShip(ship, "ads6").count * 3,
    points: (ship: any) => getSystemFromShip(ship, "ads6").count * 9,
  },
  {
    value: "antimatterSuicideCharge",
    label: "Antimatter Suicide Charge",
    type: "single",
    mass: (ship: any) => 1,
    points: (ship: any) => 5,
  },
  {
    value: "tuffleyCloak",
    label: "Tuffley Cloak",
    type: "single",
    mass: (ship: ship) => 0.1 * ship.mass,
    points: (ship: ship) => ship.mass,
  },
  {
    value: "reflexField",
    label: "Reflex Field",
    type: "single",
    mass: (ship: ship) => 0.1 * ship.mass,
    points: (ship: ship) => 0.6 * ship.mass,
  },
  {
    value: "tugSystem",
    label: "Tug system",
    type: "size",
    mass: (ship: any) =>
      asPoints(getSystemFromShip(ship, "tugSystem").size * 0.2),
    points: (ship: any) =>
      asPoints(getSystemFromShip(ship, "tugSystem").size * 0.2) * 2,
  },
]
export default shipComponents
