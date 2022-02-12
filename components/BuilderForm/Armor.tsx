import {
  InputWrapper,
  Group,
  Button,
  SimpleGrid,
  NumberInput,
} from "@mantine/core"
interface props {
  addArmorRow: () => void
  removeArmorRow: () => void
  armor: number[]
  setArmor: (arg0: number[]) => void
  regenArmor: number[]
  setRegenArmor: (arg0: number[]) => void
}

const Armor = ({
  addArmorRow,
  removeArmorRow,
  armor,
  setArmor,
  regenArmor,
  setRegenArmor,
}: props) => (
  <>
    <InputWrapper label='Armor rows'>
      <Group noWrap>
        <Button
          variant='filled'
          fullWidth
          disabled={armor.length > 3}
          onClick={addArmorRow}
        >
          Add row
        </Button>
        <Button
          variant='filled'
          color='red'
          fullWidth
          disabled={armor.length === 0}
          onClick={removeArmorRow}
        >
          Remove row
        </Button>
      </Group>
    </InputWrapper>
    <SimpleGrid cols={2}>
      <div>
        {armor.map((row: number, index: number) => (
          <NumberInput
            key={index}
            label={`Armor row ${index + 1}`}
            value={row}
            onChange={(value) => {
              const newArmor = armor.map((r: any, i: any) =>
                i === index ? value : r
              )
              setArmor(newArmor)
            }}
            min={0}
          />
        ))}
      </div>
      <div>
        {regenArmor.map((row: number, index: number) => (
          <NumberInput
            key={index}
            label={`Regen. row ${index + 1}`}
            value={row}
            onChange={(value) => {
              const newRegenArmor = regenArmor.map((r: any, i: any) =>
                i === index ? value : r
              )
              setRegenArmor(newRegenArmor)
            }}
            min={0}
          />
        ))}
      </div>
    </SimpleGrid>
  </>
)
export default Armor
