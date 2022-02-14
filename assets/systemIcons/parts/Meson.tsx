import { FC } from "react"
interface props {
  color?: string
}
const Meson: FC<props> = ({ color }) => {
  const rOut = 248
  const rIn = 170
  return (
    <>
      <path
        stroke={color ? color : "black"}
        fill={color ? color : "black"}
        strokeWidth='12'
        d={`
        M ${256 - 160} ${256 + 50}
        L ${256 + 160} ${256 + 50}
        A 170 170 0 0 1 ${256 - 160} ${256 + 50}
        `}
      />
      <path
        strokeLinecap='round'
        stroke={color ? color : "black"}
        fill={color ? color : "black"}
        strokeWidth='16'
        d={`
        M 256 306
        L 256 ${256 - 110}
        `}
      />
      <path
        strokeLinecap='round'
        stroke={color ? color : "black"}
        fill={color ? color : "black"}
        strokeWidth='42'
        d={`
        M 256 306
        L 256 ${256 + 20}
        `}
      />
    </>
  )
}
export default Meson
