import { FC, useState, useEffect, Key } from "react"
import {
  Button,
  Title,
  SimpleGrid,
  Paper,
  InputWrapper,
  TextInput,
  NumberInput,
  Group,
  Chips,
  Chip,
  Switch,
  Text,
  Divider,
  MultiSelect,
} from "@mantine/core"
import RocketIcon from "../../assets/RocketIcon"
import { printNumberArray, countDCP } from "../../logic/helpers"
import shipComponents from "../../resources/shipComponents"
import Systems from "./Systems"
import Fighters from "./Fighters"
import Hangars from "./Hangars"

interface BuilderFormProps {
  ship: any
  setShip: any
}

const BuilderForm: FC<BuilderFormProps> = ({ ship, setShip }) => {
  const addArmorRow = () => {
    const newArmor: number[] = [...ship.armor]
    const newRegenArmor: number[] = [...ship.regenArmor]
    newArmor.push(0)
    newRegenArmor.push(0)
    setShip({ ...ship, armor: newArmor, regenArmor: newRegenArmor })
  }
  const removeArmorRow = () => {
    const newArmor: number[] = [...ship.armor]
    const newRegenArmor: number[] = [...ship.regenArmor]
    newArmor.pop()
    newRegenArmor.pop()
    setShip({ ...ship, armor: newArmor, regenArmor: newRegenArmor })
  }

  /* System related functions */
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])

  const addSystemArray = (systemArray: any) => {
    const mappingFunction = (system: any) => {
      if (system.type === "single") {
        return {
          value: system.value,
          label: system.label,
          mass: system.mass,
          points: system.points,
        }
      } else if (system.type === "multiple") {
        return {
          value: system.value,
          label: system.label,
          count: 1,
          mass: system.mass,
          points: system.points,
        }
      } else if (system.type === "options") {
        return {
          value: system.value,
          label: system.label,
          version: system.options[0],
          mass: system.mass[0],
          points: system.points[0],
        }
      }
    }
    const newSystems = systemArray.map(mappingFunction)
    const prevSystems = [...ship.systems]
    const combinedSystems = prevSystems.concat(newSystems)
    setShip({ ...ship, systems: combinedSystems })
  }
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
    <div>
      {/* Structure */}
      <Paper my={16} padding='md' withBorder shadow='sm'>
        <Title order={3}>Structure</Title>
        <TextInput
          icon={<RocketIcon m='8' />}
          placeholder={"Name the ship class"}
          value={ship.name}
          onChange={(e) => setShip({ ...ship, name: e.target.value })}
          label='Ship class'
        />
        <NumberInput
          label='Mass'
          min={1}
          value={ship.mass}
          onChange={(value) => setShip({ ...ship, mass: value })}
          stepHoldDelay={500}
          stepHoldInterval={100}
        />
        <NumberInput
          label='Hull'
          min={1}
          value={ship.hull}
          onChange={(value) => setShip({ ...ship, hull: value })}
          stepHoldDelay={500}
          stepHoldInterval={100}
          error={
            ship.hull < Math.round(0.1 * ship.mass)
              ? "Hull must be over 10% of total mass"
              : undefined
          }
        />
        <NumberInput
          label='Hull rows'
          value={ship.hullRows}
          onChange={(value) => setShip({ ...ship, hullRows: value })}
          min={3}
          max={6}
          stepHoldDelay={500}
          stepHoldInterval={100}
        />
        <InputWrapper label='Armor rows'>
          <Group noWrap>
            <Button
              variant='default'
              fullWidth
              compact
              disabled={ship.armor.length > 3}
              onClick={addArmorRow}
            >
              Add
            </Button>
            <Button
              variant='default'
              fullWidth
              compact
              disabled={ship.armor.length === 0}
              onClick={removeArmorRow}
            >
              Remove
            </Button>
          </Group>
        </InputWrapper>
        <SimpleGrid cols={2}>
          <div>
            {ship.armor.map((row: number, index: number) => (
              <NumberInput
                key={index}
                label={`Armor row ${index + 1}`}
                value={row}
                onChange={(value) => {
                  const newArmor = ship.armor.map((r: any, i: any) =>
                    i === index ? value : r
                  )
                  setShip({ ...ship, armor: newArmor })
                }}
                min={0}
              />
            ))}
          </div>
          <div>
            {ship.regenArmor.map((row: number, index: number) => (
              <NumberInput
                key={index}
                label={`Regen. row ${index + 1}`}
                value={row}
                onChange={(value) => {
                  const newRegenArmor = ship.regenArmor.map((r: any, i: any) =>
                    i === index ? value : r
                  )
                  setShip({ ...ship, regenArmor: newRegenArmor })
                }}
                min={0}
              />
            ))}
          </div>
        </SimpleGrid>

        <Divider mt={16} mb={8} />
        <InputWrapper label='Stealth hull'>
          <Chips
            mb={8}
            value={ship.stealthHull}
            onChange={(value) => setShip({ ...ship, stealthHull: value })}
          >
            <Chip value='none'>No</Chip>
            <Chip value='lvl1'>Lvl 1</Chip>
            <Chip value='lvl2'>Lvl 2</Chip>
          </Chips>
        </InputWrapper>
        <Divider mt={16} mb={8} />
        <Switch
          label={`Flawed design ${
            ship.hullRows === 3 ? "(incompatible with advanced hull)" : ""
          } ${ship.mass < 60 ? "(mass 60+ required)" : ""}`}
          mt={16}
          checked={ship.flawed}
          onChange={(event) =>
            setShip({ ...ship, flawed: event.currentTarget.checked })
          }
        />
      </Paper>
      {/* Drives & streamlining */}
      <Paper my={16} padding='md' withBorder shadow='sm'>
        <Title order={3}>Drives & Streamlining</Title>
        <NumberInput
          label='Drive'
          min={0}
          value={ship.drive}
          onChange={(value) => setShip({ ...ship, drive: value })}
        />
        <Chips
          mt={16}
          mb={8}
          value={ship.driveType}
          onChange={(value) => setShip({ ...ship, driveType: value })}
        >
          <Chip value='standard'>Standard drive</Chip>
          <Chip value='advanced'>Advanced drive</Chip>
        </Chips>
        <InputWrapper label='FTL drive'>
          <Chips
            mb={8}
            value={ship.ftlDrive}
            onChange={(value) => setShip({ ...ship, ftlDrive: value })}
          >
            <Chip value='standard'>Standard</Chip>
            <Chip value='advanced'>Advanced</Chip>
            <Chip value='none'>No FTL</Chip>
          </Chips>
        </InputWrapper>
        <InputWrapper label='Atmospheric streamlining'>
          <Chips
            mb={8}
            value={ship.streamlining}
            onChange={(value) => setShip({ ...ship, streamlining: value })}
          >
            <Chip value='none'>None</Chip>
            <Chip value='partial'>Partial</Chip>
            <Chip value='full'>Full</Chip>
          </Chips>
        </InputWrapper>
      </Paper>
      {/* Additional primary ship systems */}
      <Paper my={16} padding='md' withBorder shadow='sm'>
        <Title order={3}>Hangars & Cargo</Title>
        <Hangars ship={ship} setShip={setShip} />
        <Fighters ship={ship} setShip={setShip} />
        <Text weight={600}>Cargo and passenger space</Text>
        <Group noWrap>
          <NumberInput
            value={ship.cargoSpaces}
            onChange={(value) => setShip({ ...ship, cargoSpaces: value })}
            label='Cargo'
          />
          <NumberInput
            value={ship.passengerSpaces}
            onChange={(value) => setShip({ ...ship, passengerSpaces: value })}
            label='Passenger'
          />
          <NumberInput
            value={ship.marineSpaces}
            onChange={(value) => setShip({ ...ship, marineSpaces: value })}
            label='Marine'
          />
        </Group>
        <Divider mt={16} mb={8} />
        <Text weight={600}>Additional crew</Text>
        <Group noWrap>
          <NumberInput
            min={0}
            max={countDCP(ship.hull) - ship.marines + ship.passengerSpaces * 4}
            value={ship.extraDCP}
            onChange={(value) => setShip({ ...ship, extraDCP: value })}
            label='Additional DCPs'
          />
          <NumberInput
            min={0}
            max={countDCP(ship.hull) - ship.extraDCP + ship.marineSpaces * 3}
            value={ship.marines}
            onChange={(value) => setShip({ ...ship, marines: value })}
            label='Marines'
          />
        </Group>
      </Paper>
      <Systems ship={ship} setShip={setShip} />
    </div>
  )
}
export default BuilderForm
