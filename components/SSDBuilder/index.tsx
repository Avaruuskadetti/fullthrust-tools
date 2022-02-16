import { FunctionComponent } from "react"
import Grid from "./Grid"
import Square from "./Square"
interface SSDBuilderProps {}

const SSDBuilder: FunctionComponent<SSDBuilderProps> = () => {
  const squares = Array.from(Array(48).keys())
  return (
    <div>
      <Grid>
        {squares.map((s) => (
          <Square key={s} />
        ))}
      </Grid>
    </div>
  )
}

export default SSDBuilder
