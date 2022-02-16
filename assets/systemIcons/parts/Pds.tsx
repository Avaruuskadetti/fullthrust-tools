import { FC } from "react"

const Pds: FC = () => {
  const side = 65 * Math.sqrt(2)
  return (
    <>
      <circle
        cx='256'
        cy='256'
        r='130'
        stroke='black'
        strokeWidth='14'
        fill='transparent'
      />
      <path
        stroke='black'
        fill='black'
        strokeWidth='2'
        d={`
          M 256 256
          L ${256 + side} ${256 - side}
          A 130 130 0 0 0 ${256 - side} ${256 - side}
          Z
        `}
      />
      <path
        stroke='black'
        fill='black'
        strokeWidth='2'
        d={`
          M 256 256
          L ${256 + side} ${256 + side}
          A 130 130 0 0 1 ${256 - side} ${256 + side}
          Z
        `}
      />
    </>
  )
}
export default Pds
