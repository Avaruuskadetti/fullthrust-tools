import { FC } from "react"
import BaseIcon from "./BaseIcon"

interface MoonIconInterface {
  m?: string
  size?: string
  color?: string
}

const MoonIcon: FC<MoonIconInterface> = ({ m, size, color }) => (
  <BaseIcon m={m} size={size} color={color}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1015 1015'>
      <path
        d='M600,92.5C319.72,92.5,92.5,319.72,92.5,600S319.72,1107.5,600,1107.5,1107.5,880.28,1107.5,600,880.28,92.5,600,92.5ZM567.12,999C364.52,981.6,205.5,811.62,205.5,604.5c0-205,155.84-373.68,355.52-394A462.41,462.41,0,0,1,705,335.18C725.44,314.54,752.43,302,782,302c64.07,0,116,58.87,116,131.5,0,67.87-45.35,123.72-103.57,130.75q2,20.87,2,42.25C796.4,773.9,704.28,920.16,567.12,999ZM898,852a49,49,0,1,1,49-49A49,49,0,0,1,898,852Z'
        transform='translate(-92.5 -92.5)'
        fill='currentColor'
      ></path>
      <circle cx='381.5' cy='633.5' r='126' fill='currentColor'></circle>
      <circle cx='286.5' cy='332.5' r='78' fill='currentColor'></circle>
    </svg>
  </BaseIcon>
)
export default MoonIcon
