interface props {
  stroke?: string
}
const InnerRing = ({ stroke }) => (
  <circle
    cx='256'
    cy='256'
    r='130'
    stroke={stroke ? stroke : "black"}
    strokeWidth='14'
    fill='transparent'
  />
)
export default InnerRing
