import { FC } from "react"

interface DiscordIconInterface {
  m?: string
  size?: string
}

const DiscordIcon: FC<DiscordIconInterface> = ({ m, size }) => (
  <div
    style={{
      margin: m + "px",
      width: size ? size + "px" : "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg
      aria-hidden='true'
      role='img'
      width='16'
      height='16'
      style={{
        display: "inline-block",
        userSelect: "none",
        verticalAlign: "text-bottom",
        overflow: "visible",
      }}
      fill='none'
      viewBox='0 0 256 199'
    >
      <path
        fill='currentColor'
        d='M216.856 16.597A208.5 208.5 0 00164.042 0c-2.275 4.113-4.933 9.646-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.807 207.807 0 00-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.13 161.13 0 0079.735 175.3a136.374 136.374 0 01-21.846-10.632 108.542 108.542 0 005.356-4.237c42.122 19.702 87.89 19.702 129.51 0 1.751 1.46 3.543 2.88 5.355 4.237a136.011 136.011 0 01-21.886 10.653c4.006 8.02 8.638 15.671 13.873 22.848 21.142-6.581 42.646-16.637 64.815-33.213 5.316-56.288-9.081-105.09-38.056-148.36zM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18z'
      ></path>
    </svg>
  </div>
)
export default DiscordIcon
