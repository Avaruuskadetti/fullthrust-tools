import Image from "next/image"
import styles from "./Ship.module.css"

const getFacingClass = (facing: number): string => {
  console.log(facing)
  switch (facing) {
    case 1:
      return styles.f
    case 2:
      return styles.fs
    case 3:
      return styles.as
    case 4:
      return styles.a
    case 5:
      return styles.ap
    case 6:
      return styles.fp
    default:
      return ""
  }
}

const Ship = ({ x, y, f, size, active, onClick, bands, name }) => {
  const getRangeBands = (bands: number[]) =>
    bands.map((b) => `0 0 0 ${b * size}px rgba(255,255,255,0.05)`).join(",")

  return (
    <>
      <div
        style={{
          bottom: `calc(${y}px - ${size / 2}px)`,
          left: `calc(${x}px - ${size / 2}px)`,
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: active && getRangeBands(bands),
        }}
        className={`${styles.shipContainer} ${active ? styles.active : ""}`}
      >
        <div
          className={`${styles.ship} ${getFacingClass(f)}`}
          onClick={onClick}
        >
          <Image alt='' width={100} height={100} src='/ship.png' />
        </div>
      </div>
      {active && (
        <div
          className={styles.arcs}
          style={{
            bottom: `calc(${y}px - ${100}px)`,
            left: `calc(${x}px - ${100}px)`,
          }}
        >
          <svg width={200} height={200}>
            <defs>
              <radialGradient id='RadialGradient'>
                <stop offset='0%' stopColor='white' />
                <stop offset='50%' stopColor='white' />
                <stop offset='100%' stopColor='transparent' />
              </radialGradient>
            </defs>
            <path
              stroke='url(#RadialGradient)'
              fill='transparent'
              d={`M100,100 L0,100 M100,100 L200,100 M100,100 L${50},${
                100 - (100 * Math.sqrt(3)) / 2
              } M100,100 L${50},${
                100 + (100 * Math.sqrt(3)) / 2
              } M100,100 L${150},${
                100 - (100 * Math.sqrt(3)) / 2
              } M100,100 L${150},${100 + (100 * Math.sqrt(3)) / 2}`}
            />
          </svg>
        </div>
      )}
      <div
        className={styles.label}
        style={{
          bottom: `calc(${y}px - ${16}px)`,
          left: `calc(${x}px - ${16}px)`,
        }}
      >
        {name}
      </div>
    </>
  )
}

export default Ship
