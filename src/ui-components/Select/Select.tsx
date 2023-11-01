import { FunctionComponent, memo } from 'react'
import { FieldValues } from 'react-hook-form'

type InputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  options: Array<OptionType>
  validation?: any
  error?: FieldValues
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
  error,
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
          cursor-pointer min-w-[10rem] bg-white flex align-center gap-3 
          py-3 px-4 text-xl rounded-md border border-strock mt-2
          ${className} ${error?.type && 'border-red'}
        `}
        {...validation}
      >
        {values}
      </select>
      <span className='text-red text-sm'>{error?.type}</span>
    </div>
  )
}

export default memo(Select)
