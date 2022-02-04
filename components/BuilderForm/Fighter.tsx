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
  Badge,
  Divider,
} from "@mantine/core"
import { fighters } from "../../resources/fighters"
import ValueBadges from "./ValueBadges"
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

  const getPoints = (cpv: boolean) => {
    if (fighter.type) {
      const typeData = fighters.types.filter((f) => f.value === fighter.type)[0]
      const modData = fighters.mods.filter((f) =>
        fighter.mods.includes(f.value)
      )
      const modPoints = modData.reduce((a, m) => a + m.points, 0)
      const points = (typeData.points + modPoints) * fighter.groups
      const cpvExtra = fighter.mods.includes("long") ? 42 : 30
      return cpv ? points + cpvExtra : points
    }
    return 0
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
            clearable
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
      <Divider my='md' />
      <ValueBadges npv={getPoints(false)} cpv={getPoints(true)} />
    </Paper>
  )
}
export default Fighter
