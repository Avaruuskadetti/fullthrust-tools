import { FC, ReactNode } from "react"

interface BaseIconInterface {
  m?: string
  size?: string
  color?: string
  children: ReactNode
}

const BaseIcon: FC<BaseIconInterface> = ({ m, size, color, children }) => (
  <div
    style={{
      color: color,
      margin: m + "px",
      width: size ? size + "px" : "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
)
export default BaseIcon
