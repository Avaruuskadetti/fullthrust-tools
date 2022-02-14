import { FC } from "react"

interface BranchIconInterface {
  m?: string
  size?: string
}

const BranchIcon: FC<BranchIconInterface> = ({ m, size }) => (
  <div
    style={{
      margin: m + "px",
      width: size ? size + "px" : "auto",
      height: size ? size + "px" : "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg
      aria-hidden='true'
      role='img'
      width='16'
      height='16'
      style={{
        display: "inline-block",
        userSelect: "none",
        verticalAlign: "text-bottom",
        overflow: "visible",
      }}
      viewBox='0 0 512 512'
    >
      <circle
        cx='160'
        cy='96'
        r='48'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <circle
        cx='160'
        cy='416'
        r='48'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M160 368V144'
      />
      <circle
        cx='352'
        cy='160'
        r='48'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <path
        d='M352 208c0 128-192 48-192 160'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
    </svg>
  </div>
)
export default BranchIcon
