import { FC, ReactNode } from "react"
import styles from "./BaseIcon.module.css"
interface props {
  value?: string
  textColor?: string
  fontSize?: string | number
  fontWeight?: string | number
  textMargin?: string
  children: ReactNode
}
const BaseIcon: FC<props> = ({
  value,
  textColor,
  fontSize,
  fontWeight,
  textMargin,
  children,
}) => {
  return (
    <div className={styles.iconContainer}>
      <svg
        aria-hidden='true'
        role='img'
        style={{
          display: "inline-block",
          userSelect: "none",
          verticalAlign: "text-bottom",
          overflow: "visible",
        }}
        viewBox='0 0 512 512'
      >
        {children}
      </svg>
      <div
        className={styles.iconText}
        style={{
          color: textColor,
          fontSize: fontSize ? fontSize + "rem" : "1.2rem",
          fontWeight: fontWeight ? fontWeight : "600",
          margin: textMargin ? textMargin : "",
        }}
      >
        {value}
      </div>
    </div>
  )
}
export default BaseIcon
