import { FC, useState } from "react"
import {
  Paper,
  Title,
  MultiSelect,
  Button,
  Text,
  Divider,
  NumberInput,
  Group,
  Chips,
  Chip,
  InputWrapper,
  Badge,
} from "@mantine/core"
import shipComponents from "../../resources/shipComponents"
import { getShipComponent } from "../../logic/helpers"

interface SystemsProps {
  ship: any
  setShip: any
}

const Systems: FC<SystemsProps> = ({ ship, setShip }) => {
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])

  /* Takes ship component array as input, maps that to ship system array, combines that with existing ship components */
  const addSystemArray = (systemArray: any) => {
    const mappingFunction = (system: any) => {
      if (system.type === "single") {
        return {
          value: system.value,
          label: system.label,
        }
      } else if (system.type === "multiple") {
        return {
          value: system.value,
          label: system.label,
          count: 1,
        }
      } else if (system.type === "options") {
        return {
          value: system.value,
          label: system.label,
          version: system.options[0],
        }
      }
    }
    const newSystems = systemArray.map(mappingFunction)
    const prevSystems = [...ship.systems]
    const combinedSystems = prevSystems.concat(newSystems)
    setShip({ ...ship, systems: combinedSystems })
  }
  /* Maps system values from UI to ship components, passes them to addSystemArray to be added to ship state if they do not exist in the state yet */
  const addSystems = () => {
    const systems = selectedSystems
      .map(
        (value: string) => shipComponents.filter((c) => c.value === value)[0]
      )
      .filter(
        (s) => ship.systems.filter((t: any) => t.value === s.value).length === 0
      )
    addSystemArray(systems)
  }

  return (
    <Paper my={16} padding='md' withBorder shadow='sm'>
      <Title order={3}>Ship systems</Title>
      <Group noWrap align='flex-end'>
        <MultiSelect
          searchable
          style={{ width: "100%" }}
          label='Add systems'
          placeholder='Pick one or more'
          data={shipComponents
            .filter(
              (sc) =>
                ship.systems.filter((s: any) => s.value === sc.value).length ===
                0
            )
            .sort((a, b) => (a.label < b.label ? -1 : 1))}
          value={selectedSystems}
          onChange={setSelectedSystems}
        />
        <Button
          onClick={() => {
            addSystems()
            setSelectedSystems([])
          }}
        >
          Add
        </Button>
      </Group>
      <Divider mt={16} mb={16} />
      <div>
        {ship.systems.length > 0 &&
          ship.systems.map((s: any) => (
            <Paper withBorder mt={8} padding='sm' key={s.value}>
              <Group position='apart'>
                <Text weight={600}>{s.label}</Text>
                <Button
                  compact
                  variant='subtle'
                  color='red'
                  onClick={() =>
                    setShip({
                      ...ship,
                      systems: ship.systems.filter(
                        (system: any) => system.value !== s.value
                      ),
                    })
                  }
                >
                  X
                </Button>
              </Group>
              <div>
                {s.count && (
                  <NumberInput
                    label='Count'
                    value={s.count}
                    min={1}
                    onChange={(val) =>
                      setShip({
                        ...ship,
                        systems: ship.systems.map((system: any) =>
                          system.value === s.value
                            ? { ...system, count: val }
                            : system
                        ),
                      })
                    }
                  />
                )}
                {s.version && (
                  <InputWrapper label='Choose version'>
                    <Chips
                      value={s.version}
                      onChange={(value) =>
                        setShip({
                          ...ship,
                          systems: ship.systems.map((sys: any) =>
                            sys.value === s.value
                              ? { ...sys, version: value }
                              : sys
                          ),
                        })
                      }
                    >
                      {getShipComponent(s.value).options?.map((option) => (
                        <Chip key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Chip>
                      ))}
                    </Chips>
                  </InputWrapper>
                )}
              </div>
              <Divider my='sm' />
              <Group mt='sm' spacing='xs'>
                <Badge variant='outline' color='blue'>
                  {getShipComponent(s.value).mass(ship)} mass
                </Badge>
                <Badge variant='outline' color='green'>
                  {getShipComponent(s.value).points(ship)} points
                </Badge>
              </Group>
            </Paper>
          ))}
      </div>
    </Paper>
  )
}
export default Systems
