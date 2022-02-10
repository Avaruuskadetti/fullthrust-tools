import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts"
import {
  ValueType,
  NameType,
} from "recharts/src/component/DefaultTooltipContent"
import { Box } from "@mantine/core"

const customTooltip = (unit: string) => {
  const tooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length && label) {
      const value =
        (payload[0].value as number) > 0.0001
          ? ((payload[0].value as number) * 100).toFixed(2)
          : ((payload[0].value as number) * 100).toFixed(3)
      return (
        <div
          className='custom-tooltip'
          style={{
            background: "rgba(0, 0, 0, 0.75)",
            color: "white",
            padding: "0 2px",
          }}
        >
          <p className='label'>{`${value && value}%`}</p>
        </div>
      )
    }
    return null
  }
  return tooltip
}

interface bar {
  name: string
  value: number
}
interface props {
  data: bar[]
  unit: string
}
const BarGraph = ({ data, unit }: props) => {
  return (
    <Box style={{ width: "100%" }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey='value' fill='#8884d8' />
          <XAxis
            dataKey='name'
            tick={{ fontSize: 8 }}
            interval={data.length > 20 ? 4 : 0}
          />
          <Tooltip
            content={customTooltip(unit)}
            cursor={{ fill: "rgba(0,0,0,0.5)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
export default BarGraph
