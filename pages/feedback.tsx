import type { NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import {
  Title,
  Text,
  Paper,
  Textarea,
  Group,
  Slider,
  InputWrapper,
  Grid,
  Button,
  RadioGroup,
  Radio,
  Alert,
} from "@mantine/core"
import SendIcon from "../assets/SendIcon"
import DiscordIcon from "../assets/DiscordIcon"
import GithubIcon from "../assets/GithubIcon"

const Page: NextPage = () => {
  const [input, setInput] = useState<{ [key: string]: number | string }>({
    likelyToUse: 0,
    openFeedback: "",
    playingFrequency: "",
  })
  const [sentMessage, setSentMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSending(true)
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        likelyToUse: input.likelyToUse,
        playingFrequency: input.playingFrequency,
        openFeedback: input.openFeedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const { error } = await res.json()
    if (error) {
      console.log(error)
      setSending(false)
      setErrorMessage(true)
      setErrorText(error)
      setSentMessage(false)
      return
    }
    setSending(false)
    setSentMessage(true)
    setErrorMessage(false)
    setInput({ likelyToUse: 0, openFeedback: "", playingFrequency: "" })
  }
  return (
    <Grid style={{ width: "100%" }}>
      <Grid.Col span={12} md={7}>
        <Paper withBorder shadow='sm' style={{ padding: "1rem" }} mb='md'>
          <Title order={1}>Feedback form</Title>
          <Group direction='column' grow spacing='md'>
            <form>
              <InputWrapper
                style={{ padding: "1rem 0" }}
                label='From 1 to 10, how useful is this site for you?'
              >
                <Slider
                  showLabelOnHover={true}
                  value={input.likelyToUse as number}
                  onChange={(value) =>
                    setInput((prev) => {
                      return { ...prev, likelyToUse: value }
                    })
                  }
                  min={0}
                  max={10}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 5, label: "5" },
                    { value: 10, label: "10" },
                  ]}
                />
              </InputWrapper>
              <RadioGroup
                mt='md'
                label='How often do you play Full Thrust?'
                variant='vertical'
                value={input.playingFrequency as string}
                onChange={(value) =>
                  setInput({ ...input, playingFrequency: value })
                }
              >
                <Radio value='weekly'>Weekly</Radio>
                <Radio value='monthly'>Monthly</Radio>
                <Radio value='occasionally'>Every few months</Radio>
                <Radio value='seldom'>Once or twice a year</Radio>
                <Radio value='dontPlay'>Very rarely</Radio>
                <Radio value='dontPlay'>I don&apos;t play it</Radio>
              </RadioGroup>
              <Textarea
                mt='md'
                label='Tell me whatever you want'
                placeholder='Did you find a bug? Is a feature missing? What did you like?'
                value={input.openFeedback}
                onChange={(event) =>
                  setInput({ ...input, openFeedback: event.target.value })
                }
                style={{ width: "100%" }}
                minRows={7}
              />
              <Button
                mt='md'
                onClick={handleSubmit}
                loading={sending}
                leftIcon={<SendIcon size='18' />}
              >
                Send
              </Button>
              <Alert
                color='green'
                mt='md'
                sx={{
                  borderLeft: `5px solid`,
                  display: sentMessage ? "block" : "none",
                }}
              >
                Thank you for your feedback!
              </Alert>
              <Alert
                color='red'
                mt='md'
                sx={{
                  borderLeft: `5px solid`,
                  display: errorMessage ? "block" : "none",
                }}
              >
                Sending failed!
              </Alert>
            </form>
          </Group>
        </Paper>
      </Grid.Col>
      <Grid.Col span={12} md={5}>
        <Paper withBorder shadow='sm' style={{ padding: "1rem" }} mb='md'>
          <Title order={2} mb='lg'>
            Other channels
          </Title>
          <Group direction='column'>
            <Text
              component='a'
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  theme.colorScheme === "light"
                    ? theme.colors.gray[1]
                    : theme.colors.gray[9],
                borderRadius: "100px",
                padding: "4px",
                paddingRight: "12px",
              })}
            >
              <div
                style={{
                  color: "white",
                  borderRadius: "100%",
                  backgroundColor: "#5865f2",
                  height: "calc(18px + 0.7rem)",
                  marginRight: "0.5rem",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DiscordIcon size='18' />
              </div>
              Avariisladjkeoto#4133
            </Text>
            <Link href='https://github.com/Avaruuskadetti' passHref>
              <Text
                component='a'
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    theme.colorScheme === "light"
                      ? theme.colors.gray[1]
                      : theme.colors.gray[9],
                  borderRadius: "100px",
                  padding: "4px",
                  paddingRight: "12px",
                })}
              >
                <div
                  style={{
                    color: "black",
                    borderRadius: "100%",
                    backgroundColor: "white",
                    height: "calc(18px + 0.7rem)",
                    marginRight: "0.5rem",
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GithubIcon size='18' />
                </div>
                Avaruuskadetti
              </Text>
            </Link>
          </Group>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
export default Page
