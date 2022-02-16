const Scattergun = () => {
  const rOut = 160
  const rIn = 0
  return (
    <>
      <circle
        cx='256'
        cy='256'
        r='90'
        stroke='black'
        strokeWidth='16'
        fill='transparent'
      />
      <path
        stroke='currentColor'
        strokeWidth='1'
        strokeLinejoin='round'
        fill='black'
        d={`
          M ${256 - rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
          L ${256 + rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
          L ${256 + rIn / 2} ${256 - (rIn / 2) * Math.sqrt(3)}
          Z
        `}
      />
      <path
        stroke='currentColor'
        strokeWidth='1'
        strokeLinejoin='round'
        fill='black'
        d={`
        M ${256 + rOut} 256
        L ${256 + rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
        L ${256 + rIn / 2} ${256 + (rIn / 2) * Math.sqrt(3)}
        Z
        `}
      />
      <path
        stroke='currentColor'
        strokeWidth='1'
        strokeLinejoin='round'
        fill='black'
        d={`
          M ${256 - rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
          L ${256 - rOut} 256
          L ${256 - rIn} 256
          Z
          `}
      />
    </>
  )
}
export default Scattergun
