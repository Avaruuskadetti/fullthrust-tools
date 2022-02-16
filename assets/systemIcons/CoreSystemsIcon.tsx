import { FunctionComponent } from "react"
import Bridge from "./parts/Bridge"
import LifeSupport from "./parts/LifeSupport"
import Reactor from "./parts/Reactor"
interface CoreSystemsIconProps {}

/*
Height of one item: 360
Width of one item: 360
Leftover space horizontally: 455, 91 per gap
*/

const CoreSystemsIcon: FunctionComponent<CoreSystemsIconProps> = () => {
  const cornerRadius = 48
  const margin = 0
  const boxWidth = 1535 - 2 * margin
  const boxHeight = 512 - 2 * margin
  const gapX = (1535 - 3 * 360) / 4
  const gapY = (512 - 360) / 2
  return (
    <svg
      aria-hidden='true'
      role='img'
      style={{
        display: "inline-block",
        userSelect: "none",
        verticalAlign: "text-bottom",
        overflow: "visible",
        width: "9rem",
        height: "3rem",
      }}
      viewBox='0 0 1535 512'
    >
      <path
        stroke='black'
        strokeWidth='12'
        fill='white'
        d={`
        M ${1535 - margin - cornerRadius} ${margin}
        a ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} ${cornerRadius}
        l 0 ${boxHeight - 2 * cornerRadius}
        a ${cornerRadius} ${cornerRadius} 0 0 1 ${-cornerRadius} ${cornerRadius}
        l ${-boxWidth + 2 * cornerRadius} 0
        a ${cornerRadius} ${cornerRadius} 0 0 1 ${-cornerRadius} ${-cornerRadius}
        l 0 ${-boxHeight + 2 * cornerRadius}
        a ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} ${-cornerRadius}
        Z
      `}
      />
      <Bridge gapX={gapX} gapY={gapY} />
      <LifeSupport gapX={gapX} gapY={gapY} />
      <Reactor gapX={gapX} gapY={gapY} />
    </svg>
  )
}

export default CoreSystemsIcon
