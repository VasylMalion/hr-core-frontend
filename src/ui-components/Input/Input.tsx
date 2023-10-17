import { FunctionComponent } from "react"
import { FieldValues } from "react-hook-form"

export type InputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  validation?: any
  error?: FieldValues
  type?: string
}

const Input: FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  validation,
  error,
  type = 'text',
}) => {

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          min-w-[10rem] bg-white flex align-center gap-3 py-3 px-4 
          font-[ceraProLight] text-xl rounded-md border border-strock mt-2 
          ${className} ${error?.type && '!border-red'}
          `}
        {...validation}
      />
      <span className='text-red text-sm'>{error?.type}</span>
    </div>
  )
}

export default Input
