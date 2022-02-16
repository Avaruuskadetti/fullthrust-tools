const AdvAreaScreenRays = ({ diamondWidth }) => {
  const largeRayWidth = 220
  const smallRayWidth =
    (largeRayWidth - diamondWidth / 2) / 2 + diamondWidth / 2
  const largeCircumference = Math.sqrt(largeRayWidth * largeRayWidth * 2) * 4
  const smallCircumference = Math.sqrt(smallRayWidth * smallRayWidth * 2) * 4
  const largeDash = largeCircumference / 8
  const smallDash = smallCircumference / 8
  const largeOffset = largeDash / 2
  const smallOffset = smallDash / 2
  return (
    <>
      <path
        stroke='black'
        strokeWidth='20'
        fill='transparent'
        strokeDasharray={largeDash}
        strokeDashoffset={largeOffset}
        d={`
      M ${256} ${256 - largeRayWidth}
      l ${largeRayWidth} ${largeRayWidth}
      l ${-largeRayWidth} ${largeRayWidth}
      l ${-largeRayWidth} ${-largeRayWidth}
      Z
      `}
      />
      <path
        stroke='black'
        strokeWidth='20'
        fill='transparent'
        strokeDasharray={smallDash}
        strokeDashoffset={smallOffset}
        d={`
      M ${256} ${256 - smallRayWidth}
      l ${smallRayWidth} ${smallRayWidth}
      l ${-smallRayWidth} ${smallRayWidth}
      l ${-smallRayWidth} ${-smallRayWidth}
      Z
      `}
      />
    </>
  )
}
export default AdvAreaScreenRays
