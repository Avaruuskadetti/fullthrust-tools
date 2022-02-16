const Scattergun = () => {
  const rOut = 140
  const rIn = 0
  return (
    <>
      <path
        stroke='currentColor'
        strokeWidth='12'
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
        strokeWidth='12'
        strokeLinejoin='round'
        fill='white'
        d={`
        M ${256 + rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
        L ${256 + rOut} 256
        L ${256 + rIn} 256
        Z
        `}
      />
      <path
        stroke='currentColor'
        strokeWidth='12'
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
        strokeWidth='12'
        strokeLinejoin='round'
        fill='white'
        d={`
        M ${256 + rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
        L ${256 - rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
        L ${256 - rIn / 2} ${256 + (rIn / 2) * Math.sqrt(3)} 
        Z
        `}
      />
      <path
        stroke='currentColor'
        strokeWidth='12'
        strokeLinejoin='round'
        fill='black'
        d={`
          M ${256 - rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
          L ${256 - rOut} 256
          L ${256 - rIn} 256
          Z
          `}
      />
      <path
        stroke='currentColor'
        strokeWidth='12'
        strokeLinejoin='round'
        fill='white'
        d={`
            M ${256 - rOut} 256
            L ${256 - rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
            L ${256 - rIn / 2} ${256 - (rIn / 2) * Math.sqrt(3)}
            Z
          `}
      />
    </>
  )
}
export default Scattergun
