import type { NextPage } from "next"
import A from "../components/base/A"
import { Container, Title, Text, Paper } from "@mantine/core"

const Page: NextPage = () => {
  return (
    <Paper
      withBorder
      shadow='sm'
      style={{ padding: "1rem", marginRight: "1rem" }}
      mb='md'
    >
      <Title order={2}>Rules interpretations</Title>
      <Text my='sm'>
        <p>
          Coding a ship builder for ruleset as complex as Full Thrust inevitably
          leads to situations where the rules as written are much more difficult
          to replicate in software. A small exception to a rule is easy on
          paper, but a whole different hurdle in code. This page documents
          situations where the ship builder might end to a different result
          compared to more traditional methods of starship craft.
        </p>
      </Text>
      <Title order={3}>Fighters, hangars & CPV</Title>
      <Text my='sm'>
        <p>
          Combat Point Value calculations from{" "}
          <A href='https://fullthrust.star-ranger.com/CPV.htm'>
            Star Combat News
          </A>{" "}
          were written for a different version of the rules. In Continuum,
          hangars are built from hangars, launch tubes and optional launch
          catapults, and their cost doesn&apos;t line 1:1 to old all-in-one
          hangars. The ship builder on this site uses the following CPV
          pricings:
        </p>
        <ul>
          <li>
            Hangars systems are priced 1x the combined mass of their launch
            tubes and hangars
          </li>
          <li>
            All fighter groups cost extra 30 points except long range fighters,
            which cost extra 42 points (as in CPV rules linked above)
          </li>
        </ul>
        NPV point values are unaltered. For now, gunboats and their racks are
        priced in CPV with their NPV.
      </Text>
      <Title order={3}>Technical compromises</Title>
      <Text my='sm'>
        <p>
          <strong>Class 1 short range K-Gun</strong> has an option: &quot;Short
          range K-1&apos;s can be bought in pairs for 3 mass, or they can be
          excluded from your game.&quot; This would require a much more
          complicated solution for all weapons to implement. Instead, individual
          short range class 1 K-Guns cost 1.5 mass with the end mass of all
          K-Guns rounded up to nearest integer.
        </p>
        <p>
          <strong>Boarding Torpedoes</strong> are categorised as ordnance
          instead of direct-fire weapons for ease of implementation (as
          they&apos;re the only direct fire weapon using magazines).
        </p>
        <p>
          Likewise, <strong>Plasma Bolt Launcher</strong> is categorised as a
          direct-fire weapon instead of ornance. Ordnance implementation
          doesn&apos;t have definitions for arc selection and Plasma Bolt
          Launcher doesn&apos;t use magazines.
        </p>
        <p>
          <strong>Light fighters</strong> both as a fighter type <em>and</em> a
          modification would be kind of complicated to implement in the current
          fighter code. For now the builder handles light fighters only as a
          base fighter type, allowing all modifications to be added to them
          unlike Continuum rules. Players should not pick illegal mods (heavy,
          torpedo, long range) to their light fighters if their playgroup
          doesn&apos;t allow it.
        </p>
        <p>
          <strong>Spinal Mount Nova Cannon</strong> and{" "}
          <strong>Wave Gun</strong> are yet to be implemented. Rules are unclear
          whether they count as spinal weapons and respect their ship mass
          limits.
        </p>
      </Text>
    </Paper>
  )
}
export default Page
