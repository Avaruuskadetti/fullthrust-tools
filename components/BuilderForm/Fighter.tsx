import { FC, useState } from "react"
import {
  Paper,
  Group,
  Text,
  Button,
  Grid,
  NumberInput,
  InputWrapper,
  Select,
  Chips,
  Chip,
  Alert,
} from "@mantine/core"
import { fighters } from "../../resources/fighters"
interface FighterProps {
  fighter: any
  removeFighter: any
  editFighter: any
  getFighterMax: any
}
const Fighter: FC<FighterProps> = ({
  fighter,
  removeFighter,
  editFighter,
  getFighterMax,
}) => {
  const [robotError, setRobotError] = useState(false)
  const modHandler = (val: string[]) => {
    const success = editFighter(fighter.id, "mods", val)
    setRobotError(!success)
  }
  return (
    <Paper
      key={fighter.id}
      withBorder
      mt={8}
      padding='sm'
      shadow={fighter.type === "" ? "0 0 4px red" : ""}
    >
      <Group noWrap position='apart'>
        <Text weight={600}>Fighter type {fighter.id}</Text>
        <Button
          compact
          variant='subtle'
          color='red'
          onClick={() => removeFighter(fighter.id)}
        >
          X
        </Button>
      </Group>
      <Grid>
        <Grid.Col span={4}>
          <NumberInput
            label='Groups'
            value={fighter.groups}
            onChange={(val) => {
              editFighter(fighter.id, "groups", val)
            }}
            max={getFighterMax(fighter)}
            min={1}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Select
            styles={{
              input: { outline: fighter.type === "" ? "1px solid red" : "" },
            }}
            searchable
            placeholder='type to search'
            label='Type'
            data={fighters.types}
            value={fighter.type}
            onChange={(value) => editFighter(fighter.id, "type", value)}
          />
        </Grid.Col>
      </Grid>
      <InputWrapper label='Modifications'>
        <Chips value={fighter.mods} onChange={modHandler} multiple>
          {fighters.mods.map((mod) => (
            <Chip key={mod.value} value={mod.value}>
              {mod.label}
            </Chip>
          ))}
        </Chips>
      </InputWrapper>
      {robotError && (
        <Alert mt={12} color='red'>
          Cannot change from robot to human, no space in hangars!
        </Alert>
      )}
    </Paper>
  )
}
export default Fighter
