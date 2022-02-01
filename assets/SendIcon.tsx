import { FC } from "react"

interface SendIconInterface {
  m?: string
  size?: string
}

const SendIcon: FC<SendIconInterface> = ({ m, size }) => (
  <div
    style={{
      margin: m + "px",
      width: size ? size + "px" : "auto",
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
        fill='currentColor'
        d='M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z'
      />
    </svg>
  </div>
)
export default SendIcon
