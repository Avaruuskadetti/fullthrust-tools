import { initial } from "lodash"
import React, { useEffect, useState, useRef } from "react"

import styles from "./Board.module.css"
import Ship from "./Ship"

const Board = ({ ships, setShips, active, setActive }) => {
  const [inch, setInch] = useState(0)

  const boardRef = useRef(null)
  useEffect(() => {
    const width = boardRef.current.getBoundingClientRect().width
    const height = boardRef.current.getBoundingClientRect().height
    setInch(width / 64)
  }, [])

  const deployShips = () => {
    console.log("deploying")
    const team1 = ships.filter((s) => s.team === "1")
    const team1final = team1.map((s, i) => ({
      ...s,
      y: inch * 56,
      x: (i + 1) * ((64 * inch) / (team1.length + 1)),
      f: 4,
    }))
    const team2 = ships.filter((s) => s.team === "2")
    const team2final = team2.map((s, i) => ({
      ...s,
      y: inch * 8,
      x: (i + 1) * ((64 * inch) / (team1.length + 1)),
    }))
    const newShips = [...team1final, ...team2final]
    setShips(newShips)
  }

  const moveShip = (id: number, move: number) => {
    const movedShip = ships.filter((s) => s.id === id)[0]
    const facing = movedShip.f
    let x: number, y: number
    switch (facing) {
      case 1:
        y = move * inch
        x = 0
        break
      case 2:
        y = move * inch * 0.5
        x = move * inch * Math.sqrt(3) * 0.5
        break
      case 3:
        y = -move * inch * 0.5
        x = move * inch * Math.sqrt(3) * 0.5
        break
      case 4:
        y = -move * inch
        x = 0
        break
      case 5:
        y = -move * inch * 0.5
        x = -move * inch * Math.sqrt(3) * 0.5
        break
      case 6:
        y = move * inch * 0.5
        x = -move * inch * Math.sqrt(3) * 0.5
        break
      default:
        y = 0
        x = 0
        break
    }

    const newShips = ships.map((s) =>
      s.id === id ? { ...s, y: s.y + y, x: s.x + x } : s
    )
    setShips(newShips)
  }

  const changeFacing = (facing: number, change: number) => {
    const newFacing = facing + change
    if (newFacing < 1) {
      return newFacing + 6
    }
    if (newFacing > 6) {
      return newFacing - 6
    }
    return newFacing
  }
  const turnShip = (id: number, turn: number) => {
    setShips(
      ships.map((s) => (s.id === id ? { ...s, f: changeFacing(s.f, turn) } : s))
    )
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!(active < 0)) {
      switch (event.code) {
        case "ArrowUp":
          moveShip(active, 1)
          break
        case "ArrowDown":
          moveShip(active, -1)
          break
        case "ArrowLeft":
          turnShip(active, -1)
          break
        case "ArrowRight":
          turnShip(active, 1)
          break
      }
    }
    if (event.code === "Backspace") {
      deployShips()
    }
  }

  return (
    <div
      onKeyDown={(e) => keyDownHandler(e)}
      tabIndex={0}
      className={styles.board}
      ref={boardRef}
      onClick={() => setActive(-1)}
    >
      {ships.map((ship) => (
        <Ship
          key={ship.id}
          x={ship.x}
          y={ship.y}
          f={ship.f}
          name={ship.name}
          size={inch}
          active={ship.id === active}
          bands={ship.bands}
          onClick={(e) => {
            e.stopPropagation()
            setActive(ship.id)
          }}
        />
      ))}
    </div>
  )
}
export default Board
