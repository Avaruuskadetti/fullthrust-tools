import { FC, useState, useEffect, Key } from "react"
import A from "../base/A"
import Link from "next/link"
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
import { countDCP } from "../../logic/helpers"
import Systems from "./Systems"
import Fighters from "./Fighters"
import Hangars from "./Hangars"
import Weapons from "./Weapons"
import Ordnances from "./Ordnances"
import SpinalMounts from "./SpinalMounts"
import { ship } from "../../resources/ship"

interface BuilderFormProps {
  ship: ship
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
  const [instructionsOpen, setInstructionsOpen] = useState(true)

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

  return (
    <>
      <Paper
        padding='md'
        mb={16}
        withBorder
        shadow='sm'
        style={{ display: instructionsOpen ? "block" : "none" }}
      >
        <Title order={3}>Instructions</Title>
        <Text my='sm'>
          This ship builder is designed for{" "}
          <A href='https://emeraldcoastskunkworks.wordpress.com/'>
            Full Thrust Continuum
          </A>
          . It follows ship building rules from the rulebook combined with CPV
          calculation as released on{" "}
          <A href='https://fullthrust.star-ranger.com/CPV.htm'>
            Star Combat News
          </A>
          . Some rule interpretation was required and some ship features are
          still unimplemented,{" "}
          <A href='/ship-builder-rules-interpretations'>read more here</A>.
        </Text>
        <Text my='sm'>
          Build your ship by filling in the forms below. On desktop, you will
          see the resulting ship on the right column. On mobile, preview the
          ship by clicking the rocket icon in the top right corner. Once
          you&apos;re finished, just copy the resulting ship to clipboard.
        </Text>
        <Text my='sm'>Happy building!</Text>
        <Group mt='lg' mb='sm'>
          <Button variant='outline' onClick={() => setInstructionsOpen(false)}>
            Close instructions
          </Button>
          <Link href='/feedback' passHref>
            <Button variant='subtle' component='a'>
              Leave feedback
            </Button>
          </Link>
        </Group>
      </Paper>
      {/* Structure */}
      <Paper mb={16} padding='md' withBorder shadow='sm'>
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
              variant='filled'
              fullWidth
              disabled={ship.armor.length > 3}
              onClick={addArmorRow}
            >
              Add row
            </Button>
            <Button
              variant='filled'
              color='red'
              fullWidth
              disabled={ship.armor.length === 0}
              onClick={removeArmorRow}
            >
              Remove row
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
          disabled={ship.hullRows === 3 || ship.mass < 60}
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
        <Text weight={600}>Cargo and passenger space (mass used)</Text>
        <Group noWrap>
          <NumberInput
            min={0}
            value={ship.cargoSpaces}
            onChange={(value) => setShip({ ...ship, cargoSpaces: value })}
            label='Cargo'
          />
          <NumberInput
            min={0}
            value={ship.passengerSpaces}
            onChange={(value) => setShip({ ...ship, passengerSpaces: value })}
            label='Passenger'
          />
          <NumberInput
            min={0}
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
      <Weapons ship={ship} setShip={setShip} />
      <Ordnances ship={ship} setShip={setShip} />
      <SpinalMounts ship={ship} setShip={setShip} />
    </>
  )
}
export default BuilderForm
