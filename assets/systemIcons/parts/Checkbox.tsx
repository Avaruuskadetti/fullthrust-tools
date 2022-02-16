import { FunctionComponent } from "react"
interface CheckboxProps {
  checked?: boolean
  size?: number
  px?: number
  py?: number
}
/**
 *
 * @param checked: true if box should be checked
 * @param size: width and height of the checkbox
 * @param px: position on x axis (from the middle of the icon)
 * @param py: position on y axis (from the middle of the icon)
 * @returns
 */
const Checkbox: FunctionComponent<CheckboxProps> = ({
  checked,
  size,
  px,
  py,
}) => {
  const checkSize = size - 48
  return (
    <>
      <rect
        x={256 - size / 2 + (px ? px : 0)}
        y={256 - size / 2 + (py ? py : 0)}
        width={size}
        height={size}
        stroke='black'
        strokeWidth='12'
        fill='white'
      />
      {checked && (
        <rect
          x={256 - checkSize / 2 + (px ? px : 0)}
          y={256 - checkSize / 2 + (py ? py : 0)}
          width={checkSize}
          height={checkSize}
          stroke='transparent'
          fill='black'
        />
      )}
    </>
  )
}
export default Checkbox
