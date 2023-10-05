import { useEffect, useState } from "react";

const DEBOUNCE_TIME = 500

type useDebounceProps = {
  inputValue: string
}

export const useDebounce = ({ inputValue }: useDebounceProps): string => {

  const [debouncedInputValue, setDebouncedInputValue] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, DEBOUNCE_TIME)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  return debouncedInputValue
}