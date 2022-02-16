import { FunctionComponent } from "react"
import styles from "./Square.module.css"
interface SquareProps {}

const Square: FunctionComponent<SquareProps> = () => {
  return <div className={styles.square}>Square</div>
}

export default Square
