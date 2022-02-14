interface props {
  fill?: string
}
const InnerCircle = ({ fill }) => (
  <circle
    cx='256'
    cy='256'
    r='170'
    stroke='transparent'
    strokeWidth='12'
    fill={fill ? fill : "transparent"}
  />
)
export default InnerCircle
