import { FC, useState } from "react"
import {
  Paper,
  Select,
  Grid,
  Text,
  NumberInput,
  Button,
  Group,
  Alert,
} from "@mantine/core"
import {
  spinalmount,
  spinalmountBlueprint,
  spinalmountClasses,
  spinalLimits,
} from "../../resources/spinalMounts"

interface spinalmountBuilderProps {
  spinalmount: spinalmount
  blueprint: spinalmountBlueprint
  setSpinalmount: (sm: spinalmount) => boolean
  deleteSpinalmount: () => void
}

const SpinalMountBuilder: FC<spinalmountBuilderProps> = ({
  spinalmount,
  blueprint,
  setSpinalmount,
  deleteSpinalmount,
}) => {
  const [failed, setFailed] = useState(false)
  const handleSpinalValue = (key: string, newValue: number | undefined) => {
    const success = setSpinalmount({ ...spinalmount, [key]: newValue })
    if (!success) {
      setFailed(true)
    } else {
      setFailed(false)
    }
  }
  return (
    <>
      <Paper withBorder padding='sm' mt={12}>
        <Group position='apart' align='flex-start' noWrap>
          <Text weight={600}>{spinalmount.label}</Text>
          <Button
            compact
            variant='subtle'
            color='red'
            onClick={deleteSpinalmount}
          >
            X
          </Button>
        </Group>
        <Grid>
          <Grid.Col span={8}>
            <Select
              data={spinalmountClasses}
              value={spinalmount.mass.toString()}
              onChange={(value: string) =>
                handleSpinalValue("mass", parseInt(value))
              }
              label='Weight class'
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label='Count'
              value={spinalmount.count}
              min={0}
              onChange={(value) => handleSpinalValue("count", value)}
            />
          </Grid.Col>
        </Grid>
        <Alert
          color='red'
          mt='md'
          variant='filled'
          withCloseButton
          closeButtonLabel='close'
          onClose={() => setFailed(false)}
          style={{ display: failed ? "block" : "none" }}
        >
          {`Can't add more spinal mounts! Limit is  ${spinalLimits.maxPerMassUnit} mass of spinal
          mounts per ${spinalLimits.massUnit} ship mass.`}
        </Alert>
      </Paper>
    </>
  )
}
export default SpinalMountBuilder
