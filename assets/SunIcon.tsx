import { FC } from "react"
import BaseIcon from "./BaseIcon"

interface SunIconInterface {
  m?: string
  size?: string
  color?: string
}

const SunIcon: FC<SunIconInterface> = ({ m, size, color }) => (
  <BaseIcon m={m} size={size} color={color}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1200'>
      <path
        fill='currentColor'
        d='M195.2,470.17a427.29,427.29,0,0,0-.4,258.39L.5,599.5Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M404.85,977.64l-228.61,46.12,46.12-228.61A426.85,426.85,0,0,0,404.85,977.64Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M176.24,175.24l230,46.4A426.89,426.89,0,0,0,222.51,404.57Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M600,1025a424.55,424.55,0,0,0,129.83-20.2L600.5,1199.5,471.44,1005.2A424.63,424.63,0,0,0,600,1025Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M600.5-.5l130.17,196a427.24,427.24,0,0,0-260.07-.4Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M978.36,793.77l46.4,230L795.43,977.49A426.89,426.89,0,0,0,978.36,793.77Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M794.05,221.78l230.71-46.54L978.22,406A426.89,426.89,0,0,0,794.05,221.78Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <path
        fill='currentColor'
        d='M1004.93,729.4a427.24,427.24,0,0,0-.4-260.07l196,130.17Z'
        transform='translate(-0.5 0.5)'
      ></path>
      <circle fill='currentColor' cx='599.5' cy='600.5' r='325'></circle>
    </svg>
  </BaseIcon>
)
export default SunIcon
