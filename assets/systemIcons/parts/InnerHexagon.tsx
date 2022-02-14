import { FC } from "react"
interface props {
  stroke?: string
}

const KineticGun: FC<props> = ({ stroke }) => {
  const x = 70
  const y = x * Math.sqrt(3)

  return (
    <path
      stroke={stroke ? stroke : "black"}
      strokeLinejoin='round'
      fill='transparent'
      strokeWidth='12'
      d={`
          M ${256 - x} ${256 - y}
          L ${256 + x} ${256 - y}
          L ${256 + 2 * x} ${256}
          L ${256 + x} ${256 + y}
          L ${256 - x} ${256 + y}
          L ${256 - 2 * x} ${256}
          Z
        `}
    />
  )
}
export default KineticGun
