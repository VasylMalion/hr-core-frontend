import { FunctionComponent, memo } from 'react'

import { Validation } from 'common/types/common'
import { getUniqueId } from 'common/utils/common'
import { FieldErrors } from 'ui-components'

export type TextAreaProps = {
  label?: string
  placeholder?: string
  value?: string
  validation?: Validation
  className?: string
  onChange?: (value: string) => void
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  validation,
}) => {
  const id = getUniqueId('textarea')

  return (
    <div className='font-[ceraProLight]'>
      <label htmlFor={id} className='dark:text-white'>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full h-[12rem] bg-white flex align-center gap-3 py-3 px-4 dark:bg-dark-100
          text-base rounded-md border border-strock mt-2 resize-none dark:text-white
          ${className} ${(validation && !validation?.isValid) && '!border-red'}
        `}
      />
      <FieldErrors isValid={validation?.isValid} errors={validation?.errors} />
    </div>
  )
}

export default memo(TextArea)
