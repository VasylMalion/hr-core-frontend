import { FunctionComponent, ReactNode } from "react"

type InputProps = {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

const Input: FunctionComponent<InputProps> = ({ label, placeholder, value, onChange, className }) => {

  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={
          `min-w-[10rem] bg-white flex align-center gap-3 py-3 px-4 font-[ceraProLight] text-xl rounded-md border border-strock ${className}`
        }
      />
    </div>
  )
}

export default Input
