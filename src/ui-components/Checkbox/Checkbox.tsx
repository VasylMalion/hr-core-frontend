import { FunctionComponent, memo } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type CheckboxProps = {
  caption: string
  checked: boolean
  onChange?: (value: boolean) => void
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  caption,
  checked,
  onChange,
}) => {
  const id = `input-${uuidv4}`

  return (
    <div className='flex items-center gap-4'>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='h-4 w-4 font-[ceraProLight] rounded-md border border-strock cursor-pointer'
      />
      <label htmlFor={id} className='text-md font-[ceraProLight] cursor-pointer dark:text-white'>
        <div>{caption}</div>
      </label>
    </div>
  )
}

export default memo(Checkbox)
