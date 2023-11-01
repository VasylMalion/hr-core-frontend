import { useDebounce } from "hooks/useDebounce"
import { FunctionComponent, useState } from "react"
import { FindEmployeeResponse, useFindEmployeeQuery } from "services/EmployeeService"
import { Input } from "ui-components"
import { InputProps } from "ui-components/Input/Input"

type FindInputProps = {
  onSuccessFind?: (value: FindEmployeeResponse) => void
} & InputProps

const FindInput: FunctionComponent<FindInputProps> = ({
  // value,
  label,
  // onChange,
  onSuccessFind,
  ...inputProps
}) => {

  const [value, setValue] = useState('')
  const debouncedInputValue = useDebounce({ value })

  const users = useFindEmployeeQuery({ username: debouncedInputValue })

  const usersList = users.data && users.data.map(item => (
    <div key={item.id}
      onClick={() => {
        onSuccessFind(item)
        setValue(`${item.name} ${item.surname}`)
      }}
      className='cursor-pointer px-2 py-1 hover:bg-gray-300'>{`${item.name} ${item.surname}`}</div>
  ))

  return (
    <div className='relative'>
      <Input
        label={label}
        className='w-full'
        value={value}
        onChange={setValue}
        {
          ...inputProps
        }
      />
      {value && (
        <div className='absolute w-60 bg-white max-h-10 top-[5.75rem] rounded overflow-y-auto'>
          {usersList}
        </div>
      )}
    </div>
  )
}

export default FindInput
