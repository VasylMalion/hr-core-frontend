import { FunctionComponent } from "react"
import { FieldValues } from "react-hook-form"

type DebounceInputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  validation?: any
  error?: FieldValues
}

const DebounceInput: FunctionComponent<DebounceInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  validation,
  error,
}) => {

  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          min-w-[10rem] bg-white flex align-center gap-3 py-3 px-4 
          font-[ceraProLight] text-xl rounded-md border border-strock mt-2
          relative 
          ${className} ${error?.type && '!border-red'}
          `}
        {...validation}
      />
      <div className='absolute'>123</div>
      <span className='text-red text-sm'>{error?.type}</span>
    </div>
  )
}

export default DebounceInput
