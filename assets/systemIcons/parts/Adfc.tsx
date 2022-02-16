import { FC } from "react"

interface props {
  m?: number
  size?: number
}

const Adfc: FC<props> = ({ m, size }) => {
  const w = size ? size : 140
  const wHalf = w / 2
  return (
    <>
      <rect
        x={256 - wHalf}
        y={256 - wHalf + (m ? m : 0)}
        width={w}
        height={w}
        stroke={"black"}
        strokeWidth='12'
        fill={"white"}
      />
      <path
        stroke='black'
        fill='black'
        strokeWidth='0'
        d={`
        M 256 ${256 + (m ? m : 0)}
        L ${256 + wHalf} ${256 - wHalf + (m ? m : 0)}
        L ${256 - wHalf} ${256 - wHalf + (m ? m : 0)}
        Z
      `}
      />
      <path
        stroke='black'
        fill='black'
        strokeWidth='0'
        d={`
        M 256 ${256 + (m ? m : 0)}
        L ${256 + wHalf} ${256 + wHalf + (m ? m : 0)}
        L ${256 - wHalf} ${256 + wHalf + (m ? m : 0)}
        Z
      `}
      />
    </>
  )
}
export default Adfc
