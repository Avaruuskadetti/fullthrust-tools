import { FunctionComponent } from "react"
import { gunboat, gunboats } from "../../resources/gunboats"
import {
  Paper,
  Group,
  Text,
  Button,
  Grid,
  NumberInput,
  Select,
  InputWrapper,
  Chips,
  Chip,
  Divider,
} from "@mantine/core"
import ValueBadges from "./ValueBadges"

interface GunboatBuilderProps {
  gunboat: gunboat
  removeGunboat: () => void
  editGunboat: (
    id: number,
    field: string,
    value: string | number | string[]
  ) => void
  spaceLeft: number
}

const GunboatBuilder: FunctionComponent<GunboatBuilderProps> = ({
  gunboat,
  removeGunboat,
  editGunboat,
  spaceLeft,
}) => {
  const calculatePoints = (cpv: boolean): number => {
    if (gunboat.type) {
      const typeData = gunboats.types.filter((t) => t.value === gunboat.type)[0]
      const modData = gunboats.mods.filter((m) =>
        gunboat.mods.includes(m.value)
      )
      const modPoints = modData.reduce((a, m) => a + m.points, 0)
      const totalPoints = (typeData.points + modPoints) * gunboat.groups
      return totalPoints
    }
    return 0
  }
  return (
    <Paper
      withBorder
      mt='sm'
      padding='sm'
      shadow={gunboat.type === "" ? "0 0 4px red" : ""}
    >
      <Group noWrap position='apart'>
        <Text weight={600}>Gunboat type {gunboat.id}</Text>
        <Button compact variant='subtle' color='red' onClick={removeGunboat}>
          X
        </Button>
      </Group>
      <Grid>
        <Grid.Col span={4}>
          <NumberInput
            label='Groups'
            value={gunboat.groups}
            onChange={(val) => editGunboat(gunboat.id, "groups", val)}
            min={1}
            max={gunboat.groups + spaceLeft}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Select
            styles={{
              input: { outline: gunboat.type === "" ? "1px solid red" : "" },
            }}
            searchable
            clearable
            placeholder='type to search'
            label='Type'
            data={gunboats.types}
            value={gunboat.type}
            onChange={(value: string) => editGunboat(gunboat.id, "type", value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <InputWrapper label='Modifications'>
            <Chips
              value={gunboat.mods}
              onChange={(value) => editGunboat(gunboat.id, "mods", value)}
              multiple
            >
              {gunboats.mods.map((mod) => (
                <Chip key={mod.value} value={mod.value}>
                  {mod.label}
                </Chip>
              ))}
            </Chips>
          </InputWrapper>
        </Grid.Col>
      </Grid>
      <Divider my='md' />
      <ValueBadges npv={calculatePoints(false)} />
    </Paper>
  )
}

export default GunboatBuilder
