import { useEffect, useState } from "react"
import { AppProps } from "next/app"
import Link from "next/link"
import Head from "next/head"
import {
  MantineProvider,
  AppShell,
  Box,
  ThemeIcon,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  ColorSchemeProvider,
  ColorScheme,
  Navbar,
} from "@mantine/core"
import RocketIcon from "../assets/RocketIcon"
import StarIcon from "../assets/StarIcon"
import NavItem from "../components/NavItem"
import SendIcon from "../assets/SendIcon"

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const [open, setOpen] = useState(false)

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) => {
    const newScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(newScheme)
    if (typeof window !== undefined) {
      localStorage.setItem("colorScheme", newScheme)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const csInStorage = localStorage.getItem("colorScheme")
      if (csInStorage) {
        setColorScheme(csInStorage as ColorScheme)
      }
    }
  }, [])

  const theme = useMantineTheme()

  return (
    <>
      <Head>
        <title>Full Thrust Fleet Tool</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <AppShell
            styles={{
              body: {
                backgroundColor:
                  colorScheme === "light"
                    ? theme.colors.gray[0]
                    : theme.fn.darken(theme.colors.gray[9], 0.35),
              },
            }}
            fixed
            navbar={
              <Navbar
                hiddenBreakpoint='sm'
                hidden={!open}
                width={{ sm: 300, lg: 400 }}
                padding='md'
              >
                <Navbar.Section grow>
                  <NavItem href='/' icon={<RocketIcon m='3' />} color='blue'>
                    Ship builder
                  </NavItem>
                  <NavItem
                    href='/feedback'
                    icon={<SendIcon size='14' />}
                    color='green'
                  >
                    Feedback
                  </NavItem>
                  <NavItem
                    href='/about'
                    icon={<StarIcon p={3} />}
                    color='yellow'
                  >
                    About
                  </NavItem>
                </Navbar.Section>
                <Navbar.Section>
                  <Button onClick={() => toggleColorScheme()}>
                    {colorScheme === "dark" ? "Light mode" : "Dark mode"}
                  </Button>
                </Navbar.Section>
              </Navbar>
            }
            header={
              <Header height={70} padding='md'>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan='sm' styles={{ display: "none" }}>
                    <Burger
                      opened={open}
                      onClick={() => setOpen((o) => !o)}
                      size='sm'
                      color={theme.colors.gray[6]}
                      mr='xl'
                    />
                  </MediaQuery>
                  <MediaQuery smallerThan='sm' styles={{ display: "none" }}>
                    <ThemeIcon
                      size='lg'
                      radius='xl'
                      sx={{ marginRight: "1rem", marginLeft: "0.725rem" }}
                    >
                      <RocketIcon m='6' />
                    </ThemeIcon>
                  </MediaQuery>
                  <Text
                    sx={{ fontWeight: 600 }}
                    color={
                      colorScheme === "light"
                        ? theme.colors.gray[7]
                        : theme.colors.gray[4]
                    }
                  >
                    Full Thrust Fleet Tool (beta 0.1)
                  </Text>
                </div>
              </Header>
            }
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
