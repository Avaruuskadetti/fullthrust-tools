import { Text } from "@mantine/core"
import Link from "next/link"
import { FC, ReactNode } from "react"

interface aProps {
  href: string
  children: ReactNode
}

const A: FC<aProps> = ({ href, children }) => (
  <Link href={href} passHref>
    <Text component='a' variant='link'>
      {children}
    </Text>
  </Link>
)
export default A
