import { useEffect, useState } from 'react'

const DEBOUNCE_TIME = 300

type useDebounceProps = {
  value: string
}

export const useDebounce = ({ value }: useDebounceProps): string => {
  const [debouncedInputValue, setDebouncedInputValue] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(value)
    }, DEBOUNCE_TIME)
    return () => clearTimeout(timeoutId)
  }, [value])

  return debouncedInputValue
}
