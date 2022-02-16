import { FunctionComponent } from "react"
import styles from "./Grid.module.css"
interface GridProps {}

const Grid: FunctionComponent<GridProps> = () => {
  return <div className={styles.container}></div>
}

export default Grid
