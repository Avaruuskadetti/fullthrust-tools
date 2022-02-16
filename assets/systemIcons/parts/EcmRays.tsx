import { FC } from "react"

interface rayProps {
  fill?: string
  stroke?: string
  xPos: number
  stepHeight: number
  insideRadius: number
  arcFactor: number
  flip?: boolean
}
const Ray: FC<rayProps> = ({
  fill,
  stroke,
  xPos,
  stepHeight,
  insideRadius,
  arcFactor,
  flip,
}) => {
  const angle = 0.2
  return (
    <path
      stroke={stroke ? stroke : "black"}
      strokeWidth='12'
      transform={flip ? "rotate(180 256 256)" : ""}
      fill={fill ? fill : "white"}
      d={`
        M ${256 + xPos} 256
        m ${angle * insideRadius} ${insideRadius}
        l ${angle * stepHeight} ${stepHeight}
        a ${(insideRadius + stepHeight) * arcFactor} ${
        (insideRadius + stepHeight) * arcFactor
      } 0 0 0 0 ${-(insideRadius + stepHeight) * 2}
      l ${-angle * stepHeight} ${stepHeight}
      a ${insideRadius * arcFactor} ${insideRadius * arcFactor} 0 0 1 0 ${
        insideRadius * 2
      }
      `}
    />
  )
}

interface props {
  fill?: string
  stroke?: string
}
const EcmRays: FC<props> = ({ fill, stroke }) => {
  const lgArcFactor = 1.03
  const smArcFactor = 1.02
  const smInsideRadius = 60
  const lgInsideRadius = 60
  const smStepHeight = 60
  const lgStepHeight = 115

  return (
    <>
      <Ray
        fill={fill}
        stroke={stroke}
        xPos={20}
        stepHeight={lgStepHeight}
        insideRadius={lgInsideRadius}
        arcFactor={lgArcFactor}
      />
      <Ray
        fill={fill}
        stroke={stroke}
        xPos={10}
        stepHeight={smStepHeight}
        insideRadius={smInsideRadius}
        arcFactor={smArcFactor}
      />
      <Ray
        fill={fill}
        stroke={stroke}
        xPos={20}
        stepHeight={lgStepHeight}
        insideRadius={lgInsideRadius}
        arcFactor={lgArcFactor}
        flip
      />
      <Ray
        fill={fill}
        stroke={stroke}
        xPos={10}
        stepHeight={smStepHeight}
        insideRadius={smInsideRadius}
        arcFactor={smArcFactor}
        flip
      />
    </>
  )
}
export default EcmRays
