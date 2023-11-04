import { FunctionComponent, memo } from 'react'

import { Validation } from 'common/types/common'
import { getUniqueId } from 'common/utils/common'
import { FieldErrors } from 'ui-components'

export type InputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  validation?: Validation
  type?: string
}

const Input: FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  validation,
  type = 'text',
}) => {
  const id = getUniqueId('input')

  return (
    <div className='font-[ceraProLight]'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          min-w-[10rem] bg-white flex align-center gap-3 py-3 px-4
          text-base rounded-md border border-strock mt-2 
          ${className} ${(validation && !validation?.isValid) && '!border-red'}
        `}
      />
      <FieldErrors isValid={validation?.isValid} errors={validation?.errors} />
    </div>
  )
}

export default memo(Input)
