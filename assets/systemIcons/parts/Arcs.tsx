interface props {
  arcs: number[]
  select: number[]
}
const Arcs = ({ arcs, select }: props) => {
  const a: number[] = arcs && arcs.length ? arcs : [1, 2, 3, 4, 5, 6]
  const rOut = 248
  const rIn = 170
  const fillColor = "rgba(255,255,255,1)"
  const disabledColor = "rgba(0,0,0,0.5)"
  return (
    <>
      {a.includes(1) && (
        <path
          stroke='currentColor'
          fill={select.includes(1) ? fillColor : disabledColor}
          strokeWidth='12'
          d={`
          M ${256 - rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
          A ${rOut} ${rOut} 0 0 1 ${256 + rOut / 2} ${
            256 - (rOut / 2) * Math.sqrt(3)
          }
          L ${256 + rIn / 2} ${256 - (rIn / 2) * Math.sqrt(3)}
          A ${rIn} ${rIn} 0 0 0 ${256 - rIn / 2} ${
            256 - (rIn / 2) * Math.sqrt(3)
          }
          Z
        `}
        />
      )}
      {a.includes(2) && (
        <path
          stroke='currentColor'
          fill={select.includes(2) ? fillColor : disabledColor}
          strokeWidth='12'
          d={`
        M ${256 + rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
        A ${rOut} ${rOut} 0 0 1 ${256 + rOut} 256
        L ${256 + rIn} 256
        A ${rIn} ${rIn} 0 0 0 ${256 + rIn / 2} ${256 - (rIn / 2) * Math.sqrt(3)}
        Z
        `}
        />
      )}
      {a.includes(3) && (
        <path
          stroke='currentColor'
          fill={select.includes(3) ? fillColor : disabledColor}
          strokeWidth='12'
          d={`
        M ${256 + rOut} 256
        A ${rOut} ${rOut} 0 0 1 ${256 + rOut / 2} ${
            256 + (rOut / 2) * Math.sqrt(3)
          }
        L ${256 + rIn / 2} ${256 + (rIn / 2) * Math.sqrt(3)}
        A ${rIn} ${rIn} 0 0 0 ${256 + rIn} 256
        Z
        `}
        />
      )}
      {a.includes(4) && (
        <path
          stroke='currentColor'
          fill={select.includes(4) ? fillColor : disabledColor}
          strokeWidth='12'
          d={`
        M ${256 + rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
        A ${rOut} ${rOut} 0 0 1 ${256 - rOut / 2} ${
            256 + (rOut / 2) * Math.sqrt(3)
          }
        L ${256 - rIn / 2} ${256 + (rIn / 2) * Math.sqrt(3)} 
        A ${rIn} ${rIn} 0 0 0 ${256 + rIn / 2} ${256 + (rIn / 2) * Math.sqrt(3)}
        Z
        `}
        />
      )}
      {a.includes(5) && (
        <path
          stroke='currentColor'
          fill={select.includes(5) ? fillColor : disabledColor}
          strokeWidth='12'
          d={`
        M ${256 - rOut / 2} ${256 + (rOut / 2) * Math.sqrt(3)}
        A ${rOut} ${rOut} 0 0 1 ${256 - rOut} 256
        L ${256 - rIn} 256
        A ${rIn} ${rIn} 0 0 0 ${256 - rIn / 2} ${256 + (rIn / 2) * Math.sqrt(3)}
        Z
        `}
        />
      )}
      {a.includes(6) && (
        <path
          stroke='currentColor'
          fill={select.includes(6) ? fillColor : disabledColor}
          strokeWidth='12'
          d={`
    M ${256 - rOut} 256
    A ${rOut} ${rOut} 0 0 1 ${256 - rOut / 2} ${256 - (rOut / 2) * Math.sqrt(3)}
    L ${256 - rIn / 2} ${256 - (rIn / 2) * Math.sqrt(3)}
    A ${rIn} ${rIn} 0 0 0 ${256 - rIn} 256
    Z
    `}
        />
      )}
    </>
  )
}
export default Arcs
