import { FC, useEffect, useState } from "react"
import {
  Paper,
  Select,
  Grid,
  Text,
  NumberInput,
  Button,
  Group,
} from "@mantine/core"
import { weaponBlueprint, weaponClass } from "../../resources/weapons"
import { weapon } from "../../resources/weapons"

interface WeaponBuilderProps {
  weapon: weapon
  blueprint: weaponBlueprint
  setWeapon: (weapon: weapon) => void
  deleteWeapon: () => void
}

const WeaponBuilder: FC<WeaponBuilderProps> = ({
  weapon,
  blueprint,
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
    <Paper withBorder padding='sm' my={12}>
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
    </Paper>
  )
}
export default WeaponBuilder
