import { FC } from "react"
interface props {
  py?: number
  rotate?: number
}

const CloakingDevice: FC<props> = ({ py, rotate }) => {
  const side = 65 * Math.sqrt(2)
  const radius = 130
  return (
    <>
      <circle
        cx='256'
        cy={256 + (py ? py : 0)}
        r='130'
        stroke='black'
        strokeWidth='14'
        fill='transparent'
        transform={rotate ? "rotate(180 256 256)" : ""}
      />
      <path
        stroke='black'
        fill='black'
        strokeWidth='2'
        transform={rotate ? `rotate(${rotate} 256 256)` : ""}
        d={`
          M 256 ${256 - radius + (py ? py : 0)}
          l 0 ${radius * 2}
          a 130 130 0 0 0 0 ${-radius * 2}
          Z
        `}
      />
    </>
  )
}
export default CloakingDevice
