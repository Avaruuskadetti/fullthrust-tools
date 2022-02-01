import { FC, useState } from "react"
import {
  Paper,
  Select,
  Text,
  NumberInput,
  Button,
  Group,
  Grid,
  InputWrapper,
} from "@mantine/core"
import {
  ordnanceBlueprint,
  ordnance,
  salvo,
  getOrdnanceBlueprint,
} from "../../resources/ordnance"

interface ordnanceBuilderProps {
  ordnance: ordnance
  blueprint: ordnanceBlueprint
  setOrdnance: (ordnance: ordnance) => void
  deleteOrdnance: () => void
}

const OrdnanceBuilder: FC<ordnanceBuilderProps> = ({
  ordnance,
  blueprint,
  setOrdnance,
  deleteOrdnance,
}) => {
  return (
    <Paper withBorder padding='sm' mt={12}>
      <Group position='apart' align='flex-start' noWrap>
        <Text weight={600}>{ordnance.label}</Text>
        <Button compact variant='subtle' color='red' onClick={deleteOrdnance}>
          X
        </Button>
      </Group>
      <Grid align='end'>
        <Grid.Col
          span={12 / (ordnance.magazine ? ordnance.magazine.length + 1 : 3)}
        >
          <NumberInput
            label='Count'
            value={ordnance.count}
            onChange={(value: number) =>
              setOrdnance({ ...ordnance, count: value })
            }
          />
        </Grid.Col>
        {ordnance.magazine && (
          <Grid.Col
            span={
              ordnance.magazine
                ? (12 / (ordnance.magazine.length + 1)) *
                  ordnance.magazine.length
                : 6
            }
          >
            <div>
              {ordnance.magazine && ordnance.magazine.length > 1 && (
                <Text weight={600}>Ammo in magazines</Text>
              )}
              <Group noWrap align='flex-end'>
                {blueprint.magazine &&
                  ordnance.magazine &&
                  ordnance.magazine.map((s: salvo) => (
                    <NumberInput
                      key={s.value}
                      label={`${s.label}`}
                      value={s.count}
                      onChange={(value: number) => {
                        const newSalvo = { ...s, count: value }
                        const newOrdnance = {
                          ...ordnance,
                          magazine: ordnance.magazine?.map((oldSalvo) =>
                            oldSalvo.value === s.value ? newSalvo : oldSalvo
                          ),
                        }
                        setOrdnance(newOrdnance)
                      }}
                      min={0}
                    />
                  ))}
              </Group>
            </div>
          </Grid.Col>
        )}
        {blueprint.variants.length > 1 &&
          !blueprint.magazine &&
          ordnance.variant && (
            <Grid.Col span={ordnance.magazine ? 12 : 8}>
              <Select
                label='Variant'
                data={blueprint.variants}
                value={ordnance.variant.value}
                onChange={(value: string) =>
                  setOrdnance({
                    ...ordnance,
                    variant: {
                      value: value,
                      label: getOrdnanceBlueprint(
                        ordnance.value
                      ).variants.filter((v) => v.value === value)[0].label,
                    },
                  })
                }
              />
            </Grid.Col>
          )}
      </Grid>
    </Paper>
  )
}
export default OrdnanceBuilder
