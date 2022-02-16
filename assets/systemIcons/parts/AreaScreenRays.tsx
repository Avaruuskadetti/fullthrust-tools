const AreaScreenRays = ({ dotRadius }) => {
  const largeRadius = 190
  const largeDash = (2 * largeRadius * Math.PI) / 8
  const smallRadius = (largeRadius - dotRadius) / 2 + dotRadius
  const smallDash = (2 * smallRadius * Math.PI) / 8
  return (
    <>
      <circle
        cx={256}
        cy={256}
        r={largeRadius}
        stroke='black'
        strokeWidth='20'
        strokeLinecap='round'
        strokeDasharray={largeDash}
        strokeDashoffset={largeDash / 2}
        fill='transparent'
      />
      <circle
        cx={256}
        cy={256}
        r={smallRadius}
        stroke='black'
        strokeWidth='20'
        strokeLinecap='round'
        strokeDasharray={smallDash}
        strokeDashoffset={smallDash / 2}
        fill='transparent'
      />
    </>
  )
}
export default AreaScreenRays
