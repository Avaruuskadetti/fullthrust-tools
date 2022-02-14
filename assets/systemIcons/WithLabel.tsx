import { ReactNode } from "react"
import styles from "./WithLabel.module.css"

interface props {
  label: string
  children: ReactNode
}
const WithLabel = ({ label, children }) => (
  <div className={styles.container}>
    <div className={styles.icon}>{children}</div>
    <div className={styles.label}>{label}</div>
  </div>
)
export default WithLabel
