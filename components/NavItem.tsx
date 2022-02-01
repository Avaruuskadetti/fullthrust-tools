import { FC, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Text, ThemeIcon } from "@mantine/core"
interface NavItemProps {
  icon: ReactNode
  children: ReactNode
  color: string
  href: string
  close: () => void
}
const NavItem: FC<NavItemProps> = ({
  icon,
  children,
  color = "blue",
  href,
  close,
}) => {
  const router = useRouter()
  const handleClick = (e: any) => {
    e.preventDefault()
    close()
    router.push(href)
  }
  return (
    <Link href='/' passHref>
      <Text
        onClick={handleClick}
        component='a'
        my={8}
        sx={(theme) => ({
          display: "flex",
          flexFlow: "row noWrap",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.white,
          textAlign: "left",
          padding: "0.6rem 1rem",
          cursor: "pointer",
          borderRadius: theme.radius.sm,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
          },
        })}
      >
        <ThemeIcon
          color={color}
          variant='light'
          style={{ marginRight: "1rem", padding: "1px" }}
        >
          {icon}
        </ThemeIcon>
        <Text>{children}</Text>
      </Text>
    </Link>
  )
}
export default NavItem
