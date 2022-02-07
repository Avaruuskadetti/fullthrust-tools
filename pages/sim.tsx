import { useState } from "react"
import {
  getPossibleOrders,
  getPossiblePositions,
  targetOnArc,
  rollWithCrits,
} from "../logic/sim/functions"
import { simShip, position } from "../logic/sim/interfaces"

const testShip: simShip = {
  position: { x: 0, y: 0, facing: 3 },
  drive: 4,
  velocity: 4,
}

const getMapRotation = (facing: number) => ({
  transform: `rotate(${-(facing - 1) * 60 - 180}deg)`,
  transformBox: "fill-box",
  transformOrigin: "center",
})

const Sim = () => {
  const [ship, setShip] = useState(testShip)

  return (
    <div>
      <div>
        <p>
          Ship position: x={ship.position.x} y={ship.position.y} facing=
          {ship.position.facing} velocity={ship.velocity} drive={ship.drive}
        </p>
      </div>
      <button onClick={() => getPossibleOrders(ship)}>Test positions</button>
      <button onClick={() => rollWithCrits(48)}>Test crit rolling</button>
      <div>
        <button
          onClick={() =>
            setShip((prev) => ({ ...prev, velocity: prev.velocity - 1 }))
          }
        >
          - vel
        </button>
        <button
          onClick={() =>
            setShip((prev) => ({ ...prev, velocity: prev.velocity + 1 }))
          }
        >
          + vel
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            setShip((prev) => ({ ...prev, drive: prev.drive - 1 }))
          }
        >
          - drive
        </button>
        <button
          onClick={() =>
            setShip((prev) => ({ ...prev, drive: prev.drive + 1 }))
          }
        >
          + drive
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            setShip((prev) => ({
              ...prev,
              position: { ...prev.position, facing: prev.position.facing - 1 },
            }))
          }
        >
          - facing
        </button>
        <button
          onClick={() =>
            setShip((prev) => ({
              ...prev,
              position: { ...prev.position, facing: prev.position.facing + 1 },
            }))
          }
        >
          + facing
        </button>
      </div>

      <div
        style={{
          width: "400px",
          height: "400px",
          transform: "scaleY(-1)",
        }}
      >
        <svg width='100%' height='100%' viewBox='0 0 30 30'>
          <image
            href='ship.png'
            x={15 + ship.position.x - 0.25}
            y={15 + ship.position.y - 0.25}
            width='0.5'
            height='0.5'
            style={getMapRotation(ship.position.facing)}
          />
          {getPossiblePositions(ship).map((p, index) => (
            <image
              key={index}
              href='future.png'
              x={15 + p.x - 0.25}
              y={15 + p.y - 0.25}
              width='0.5'
              height='0.5'
              style={getMapRotation(p.facing)}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
export default Sim
