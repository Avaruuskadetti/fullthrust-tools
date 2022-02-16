import { FC } from "react"

interface props {
  fill?: string
  stroke?: string
  size?: number
  m?: number
}
const Diamond: FC<props> = ({ fill, stroke, size, m }) => {
  return (
    <path
      stroke={stroke ? stroke : "black"}
      fill={fill ? fill : "black"}
      strokeWidth='12'
      d={`
        M ${256 - size / 2} ${256 - (m ? m : 0)}
        L ${256} ${256 - size / 2 - (m ? m : 0)}
        L ${256 + size / 2} ${256 - (m ? m : 0)}
        L ${256} ${256 + size / 2 - (m ? m : 0)}
        Z
      `}
    />
  )
}
export default Diamond
