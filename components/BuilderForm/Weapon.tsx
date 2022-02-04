import { FC, useEffect, useState } from "react"
import {
  Paper,
  Select,
  Grid,
  Text,
  NumberInput,
  Button,
  Group,
  Badge,
} from "@mantine/core"
import { weaponBlueprint, weaponClass, weapon } from "../../resources/weapons"
import { ship } from "../../resources/ship"

interface WeaponBuilderProps {
  weapon: weapon
  blueprint: weaponBlueprint
  ship: ship
  setWeapon: (weapon: weapon) => void
  deleteWeapon: () => void
}

const WeaponBuilder: FC<WeaponBuilderProps> = ({
  weapon,
  blueprint,
  ship,
  setWeapon,
  deleteWeapon,
}) => {
  const classData =
    blueprint.classes != undefined
      ? blueprint.classes?.map((c: weaponClass) => {
          return { value: c.value, label: c.label }
        })
      : []
  const currentClass =
    blueprint.classes != undefined
      ? blueprint.classes?.filter(
          (c: weaponClass) => c.value === weapon.class
        )[0]
      : { value: "", label: "", arcs: [] }
  const arcData =
    currentClass != undefined && currentClass.arcs != undefined
      ? currentClass.arcs
      : []
  return (
    <Paper withBorder padding='sm' mt={12}>
      <Group position='apart' align='flex-start' noWrap>
        <Text weight={600}>
          {`${
            weapon.class && blueprint.classes && blueprint.classes.length > 1
              ? `Class ${weapon.class} `
              : ""
          }${weapon.label}  
        ${
          weapon.arcs
            ? `(${weapon.arcs}\u00a0arc${weapon.arcs === "1" ? "" : "s"})`
            : ""
        }`}
        </Text>
        <Button compact variant='subtle' color='red' onClick={deleteWeapon}>
          X
        </Button>
      </Group>
      <Grid columns={24}>
        <Grid.Col span={10}>
          <Select
            disabled={blueprint.classes.length === 1}
            label='Class'
            data={classData}
            value={weapon.class}
            onChange={(value: string) =>
              setWeapon({
                ...weapon,
                class: value,
                arcs: blueprint.classes.filter((c) => c.value === value)[0]
                  .arcs[0],
              })
            }
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <Select
            disabled={arcData.length === 1}
            label='Arcs'
            data={arcData}
            value={weapon.arcs}
            onChange={(value: string) => setWeapon({ ...weapon, arcs: value })}
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <NumberInput
            label='Count'
            min={1}
            value={weapon.count}
            onChange={(value: number) => setWeapon({ ...weapon, count: value })}
          />
        </Grid.Col>
      </Grid>
      {blueprint.variants && (
        <Select
          label='Variants'
          data={blueprint.variants}
          value={weapon.variant}
          onChange={(value: string) => setWeapon({ ...weapon, variant: value })}
        />
      )}
      <Group mt='sm' spacing='xs'>
        <Badge variant='outline' color='blue'>
          {blueprint.mass(weapon, ship)} mass
        </Badge>
        <Badge variant='outline' color='green'>
          {blueprint.points(weapon, ship)} points
        </Badge>
      </Group>
    </Paper>
  )
}
export default WeaponBuilder
