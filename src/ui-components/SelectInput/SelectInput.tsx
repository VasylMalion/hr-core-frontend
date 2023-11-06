import { FunctionComponent, memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { Input, InputProps } from 'ui-components'
import { FindedUser } from 'common/types/common'

type SelectInputProps = {
  onSuccessFind?: (value: FindedUser) => void
  setValue?: (value: string) => void
  data?: Array<object>
  isLoading?: boolean
} & InputProps

const SelectInput: FunctionComponent<SelectInputProps> = ({
  data,
  value,
  isLoading,
  setValue,
  onSuccessFind,
  ...inputProps
}) => {
  const { t } = useTranslation(TranslationNamespace.uiComponents)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLInputElement>(null)

  const [edited, setEdited] = useState<boolean>(false)

  const options = data && data.map((item: FindedUser) => (
    <div key={item.id}
      onClick={() => {
        onSuccessFind(item)
        setValue(`${item.name} ${item.surname}`)
        setEdited(false)
      }}
      className='cursor-pointer px-3 py-3 hover:bg-gray-300'>{`${item.name} ${item.surname}`}</div>
  ))

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        if (edited) {
          setValue('')
          setEdited(false)
          onSuccessFind(null)
        }
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [value, setValue, edited])

  const handleChange = (value: string) => {
    setValue(value)
    setEdited(true)
  }

  return (
    <div className='relative' ref={listRef}>
      <Input
        inputRef={inputRef}
        className='w-full'
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
      {document.activeElement === inputRef.current && (
        <div className='absolute w-full bg-white max-h-[9rem] top-[5.75rem] dark:bg-dark-100 rounded overflow-y-auto z-50'>
          {!isLoading ? options : (
            <div className='flex justify-center items-center h-[6rem]'>
              {t('loading')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SelectInput)
