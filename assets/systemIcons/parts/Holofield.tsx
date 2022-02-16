import { FC } from "react"

interface props {
  offset: number
}
const ShipShape: FC<props> = ({ offset }) => (
  <path
    stroke='white'
    strokeWidth='20'
    strokeLinecap='round'
    fill='black'
    d={`
    M ${256 + offset} ${256 - 175}
    l -20   20
    l -30   60
    l -40   40
    l   0  160
    l  45   40
    l   0   20
    l  45   10
    l  45  -10
    l   0  -20
    l  45  -40
    l   0 -160
    l -40  -40
    l -30  -60
    Z
  `}
  />
)

const Holofield = () => {
  return (
    <>
      <ShipShape offset={+60} />
      <ShipShape offset={-60} />
      <ShipShape offset={0} />
    </>
  )
}
export default Holofield
