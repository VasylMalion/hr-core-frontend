import { FunctionComponent, ReactNode } from "react"
import DatePickerCom from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

type InputProps = {
  label?: string
  placeholder?: string
  value: Date
  onChange: (value: Date) => void
  className?: string
}

const DatePicker: FunctionComponent<InputProps> = ({ label, placeholder, value, onChange, className }) => {

  return (
    <div>
      <label>{label}</label>
      <DatePickerCom
        placeholderText={placeholder}
        onChange={(date) => onChange(date)}
        selected={value}
        showYearDropdown
        showMonthDropdown
        dateFormat="dd/MM/yyyy"
        dropdownMode="select"
        className={
          `min-w-[10rem] bg-white flex align-center gap-3 py-3 px-4 font-[ceraProLight] text-xl rounded-md border border-strock mt-2 ${className}`
        }
      />
    </div>
  )
}

export default DatePicker
