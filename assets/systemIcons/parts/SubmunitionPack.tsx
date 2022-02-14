import { FC } from "react"

const SubmunitionPack: FC = () => {
  const rOut = 248
  const rIn = 170
  return (
    <>
      <path
        stroke='black'
        fill='black'
        strokeWidth='6'
        d={`
          M ${256} ${256 + 60}
          L ${256 - 80} 150
          L ${256 + 80} 150
          Z
        `}
      />
      <circle
        cx='256'
        cy='306'
        r='80'
        stroke='black'
        strokeWidth='16'
        fill='transparent'
      />
    </>
  )
}
export default SubmunitionPack
