import { FunctionComponent } from "react"
interface RectangleProps {
  w: number
  h: number
  px?: number
  py?: number
  stroke?: string
  fill?: string
}

const Rectangle: FunctionComponent<RectangleProps> = ({
  w,
  h,
  px,
  py,
  stroke,
  fill,
}) => {
  return (
    <rect
      x={256 - w / 2 + (px ? px : 0)}
      y={256 - h / 2 + (py ? py : 0)}
      width={w}
      height={h}
      stroke={stroke ? stroke : "black"}
      strokeWidth='12'
      fill={fill ? fill : "white"}
    />
  )
}

export default Rectangle
