import Board from "../components/sandbox/Board"
import {
  Paper,
  Grid,
  NumberInput,
  Button,
  Group,
  Title,
  Textarea,
} from "@mantine/core"
import { useEffect, useState } from "react"

const rollD6 = (count: number, mod: number) => ({
  dice: Array(count)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 6 + 1))
    .sort((a, b) => b - a),
  mod: mod,
})

interface ResultProps {
  result: number[]
  mod: number
}
const Result = ({ result, mod }) => {
  const hits = result.filter((r: number) => r > 3 - mod).length
  const rerolls = result.filter((r: number) => r === 6).length
  return (
    <div style={{ margin: "0.5rem 0" }}>
      <p style={{ margin: 0 }}>
        {hits} hits, {rerolls} rerolls.
      </p>
      <p style={{ margin: 0, fontSize: "0.7rem" }}>
        (
        {result.map((r: number, i: number) => (
          <>
            <span style={{ fontWeight: r > 3 - mod ? 800 : 400 }}>{r}</span>
            {i !== result.length - 1 ? ", " : ""}
          </>
        ))}
        )
      </p>
    </div>
  )
}

const initialShips = [
  { id: 0, x: 50, y: 50, f: 1, bands: [12, 24], name: "Frigate", team: "1" },
  { id: 1, x: 100, y: 50, f: 1, bands: [12, 24], name: "Frigate", team: "1" },
  { id: 2, x: 150, y: 50, f: 1, bands: [12, 24], name: "Frigate", team: "1" },
  {
    id: 3,
    x: 200,
    y: 50,
    f: 1,
    bands: [12, 24, 36],
    name: "Cruiser",
    team: "1",
  },
  {
    id: 4,
    x: 250,
    y: 50,
    f: 1,
    bands: [12, 24, 36],
    name: "Battleship",
    team: "1",
  },
  {
    id: 5,
    x: 300,
    y: 50,
    f: 1,
    bands: [12, 24, 36],
    name: "Cruiser",
    team: "1",
  },
  { id: 6, x: 350, y: 50, f: 1, bands: [12, 24], name: "Frigate", team: "1" },
  { id: 7, x: 400, y: 50, f: 1, bands: [12, 24], name: "Frigate", team: "1" },
  { id: 8, x: 450, y: 50, f: 1, bands: [12, 24], name: "Frigate", team: "1" },
  { id: 10, x: 50, y: 150, f: 1, bands: [12, 24], name: "Frigate", team: "2" },
  { id: 11, x: 100, y: 150, f: 1, bands: [12, 24], name: "Frigate", team: "2" },
  { id: 12, x: 150, y: 150, f: 1, bands: [12, 24], name: "Frigate", team: "2" },
  {
    id: 13,
    x: 200,
    y: 150,
    f: 1,
    bands: [12, 24, 36],
    name: "Cruiser",
    team: "2",
  },
  {
    id: 14,
    x: 250,
    y: 150,
    f: 1,
    bands: [12, 24, 36],
    name: "Battleship",
    team: "2",
  },
  {
    id: 15,
    x: 300,
    y: 150,
    f: 1,
    bands: [12, 24, 36],
    name: "Cruiser",
    team: "2",
  },
  { id: 16, x: 350, y: 150, f: 1, bands: [12, 24], name: "Frigate", team: "2" },
  { id: 17, x: 400, y: 150, f: 1, bands: [12, 24], name: "Frigate", team: "2" },
  { id: 18, x: 450, y: 150, f: 1, bands: [12, 24], name: "Frigate", team: "2" },
]

const Sandbox = () => {
  const [dice, setDice] = useState(0)
  const [mod, setMod] = useState(0)
  const [results, setResults] = useState([])
  const [ships, setShips] = useState(initialShips)
  const [notes, setNotes] = useState(
    initialShips.map((s) => ({ id: s.id, note: "" }))
  )
  const [active, setActive] = useState(-1)

  const getNote = (id: number): string => {
    const note = notes.filter((n) => n.id === id)[0]
    return note ? note.note : ""
  }
  const setNote = (id: number, note: string): void => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, note: note } : n)))
  }

  return (
    <Grid>
      <Grid.Col span={8}>
        <Paper mb='md'>
          <Board
            ships={ships}
            setShips={setShips}
            active={active}
            setActive={setActive}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <Paper
          withBorder
          shadow='md'
          padding='md'
          style={{ marginRight: "1rem" }}
        >
          <Title order={2}>Roll dice</Title>
          <Group noWrap align='end'>
            <NumberInput
              label='Count'
              min={1}
              value={dice}
              onChange={(value) => setDice(value)}
            />
            <NumberInput
              label='Mod'
              value={mod}
              onChange={(value) => setMod(value)}
            />
            <Button onClick={() => setResults([...results, rollD6(dice, mod)])}>
              Roll
            </Button>
          </Group>
          <Title my='md' order={3}>
            Result
          </Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {results.slice(-3).map((r, i) => (
              <Result key={i} result={r.dice} mod={r.mod} />
            ))}
          </div>
        </Paper>
        <Paper
          withBorder
          my='md'
          shadow='md'
          padding='md'
          style={{ marginRight: "1rem" }}
        >
          <Title order={2}>Active ship</Title>
          <Textarea
            label='notes'
            autosize
            value={getNote(active)}
            maxRows={10}
            onChange={(event) => setNote(active, event.target.value)}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
export default Sandbox
