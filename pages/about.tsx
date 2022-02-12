import type { NextPage } from "next"
import Link from "next/link"
import { Container, Title, Text, Paper } from "@mantine/core"

const Page: NextPage = () => {
  return (
    <Paper
      withBorder
      shadow='sm'
      style={{ padding: "1rem", marginRight: "1rem" }}
      mb='md'
    >
      <Title order={2}>What&apos;s this thing?</Title>
      <Text my='sm'>
        <p>
          Hello there! Nice to see you have found my playground. Full Thrust
          Fleet tools is my personal pet project to make FT fleet building just
          a bit easier. This whole thing started as a design exercise to replace
          ship building excels with a web app, but as many good things do, it
          spiraled a bit out of control as more and more ideas popped up while
          writing the code.
        </p>
        <p>
          Currently the site consists of a fleet building tool based on
          Continuum rules accompanied by a few simulation tools to support
          better-informed ship design decisions. This should be considered some
          kind of a minimum viable product, though, as I&apos;ve got quite a few
          further plans with this site. I&apos;m also open to any and all
          feature suggestions, so feel free to pop over to the feedback form or
          slide into my Discord DMs in case you have ideas.
        </p>
        <p>
          Speaking about technical details, the site is developed on
          React/NextJS with Typescript and hosted on Vercel. I will probably
          open the Github repository for access as soon as I&apos;ve had some
          time to clean up and refactor the code - it&apos;s currently a bit
          messy as I have concentrated on developing all the fun features and I
          didn&apos;t plan for half of them beforehand. :)
        </p>
      </Text>
    </Paper>
  )
}
export default Page
