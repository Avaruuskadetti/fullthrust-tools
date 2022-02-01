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
      <Title order={2}>Hello there</Title>
      <Text my='sm'>
        <p>Lorem ipsum</p>
      </Text>
    </Paper>
  )
}
export default Page
