import { FC } from "react"

const MultipleKinetic: FC = () => {
  const x = 80
  const y = x * Math.sqrt(3)
  const yOff = 60
  const triEnd = 60
  const triPoint = 300
  return (
    <>
      <path
        stroke='black'
        strokeLinejoin='round'
        fill='transparent'
        strokeWidth='12'
        d={`
          M ${256 - x} ${256 - y + yOff}
          L ${256 + x} ${256 - y + yOff}
          L ${256 + 2 * x} ${256 + yOff}
          L ${256 + x} ${256 + y + yOff}
          L ${256 - x} ${256 + y + yOff}
          L ${256 - 2 * x} ${256 + yOff}
          Z
        `}
      />
      <path
        fill='black'
        stroke='black'
        strokeWidth='16'
        d={`
          M 256 ${triPoint}
          L ${256 - x} ${triEnd}
          L ${256 + x} ${triEnd}
          Z
        `}
      />
    </>
  )
}
export default MultipleKinetic
