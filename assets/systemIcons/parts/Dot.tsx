import { FC } from "react"

interface props {
  mb?: number
  mt?: number
}
const Dot: FC<props> = ({ mb, mt }) => {
  const radius = 40
  return (
    <circle
      cx='256'
      cy={256 + (mb ? -mb : 0) + (mt ? mt : 0)}
      r={radius}
      stroke='transparent'
      strokeWidth='12'
      fill='black'
    />
  )
}
export default Dot
