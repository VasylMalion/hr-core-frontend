import { FunctionComponent, memo } from 'react'

import { Validation } from 'common/types/common'
import { FieldErrors } from 'ui-components'

type InputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  options: Array<OptionType>
  validation?: Validation
}

type OptionType = {
  title: string
  value: string | number
}

const Select: FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  options,
  validation,
}) => {

  const values = options.map((option, index) => <option key={index} value={option.value}>{option.title}</option>)

  return (
    <div className='font-[ceraProLight]'>
      <label htmlFor='select'>{label}</label>
      <select
        value={value}
        name='select'
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          cursor-pointer min-w-[12rem] bg-white flex align-center gap-3
          py-3 px-4 text-base rounded-md border border-strock mt-2 dark:bg-dark-100
          ${className} ${validation && !validation.isValid && 'border-red'}
        `}
      >
        {values}
      </select>
      <FieldErrors isValid={validation.isValid} errors={validation.errors} />
    </div>
  )
}

export default memo(Select)
