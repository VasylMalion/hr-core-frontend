import { FunctionComponent, memo } from 'react'
import AsyncSelect from 'react-select/async'

export type SelectInputProps = {
  onChange: (value: any) => void
  inputValue?: string
  options: any
  onInputChange?: any
}

const SelectInput: FunctionComponent<SelectInputProps> = ({ onChange, options, inputValue, onInputChange }) => {

  return (
    <AsyncSelect loadOptions={options} isClearable onChange={onChange} inputValue={inputValue} onInputChange={onInputChange}
        classNames={{
          // container: () => 'rounded-md border border-strock',
          control: () => 'rounded-md border border-strock text-xl focus:border-red',
          input: () => 'min-w-[15rem] bg-white flex align-center gap-3 font-[ceraProLight] py-3 text-xl mt-2 focus:border-red',
          menuList: () => 'max-w-60',
        }}
      />
  )
}

export default SelectInput
