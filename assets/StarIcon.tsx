interface StarIconProps {
  p: number
}
const StarIcon = ({ p }: StarIconProps) => (
  <div
    style={{
      padding: p + "px",
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
      <path
        d='M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='32'
      />
    </svg>
  </div>
)
export default StarIcon
