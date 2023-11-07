import { memo } from 'react'

export type TabOption<T = string> = {
  title: string
  value: T
}

type TabProps<T> = TabOption<T> & {
  isActive?: boolean
  onChange?: (value: T) => void
}

const Tab = <T extends unknown>({ title, value, isActive, onChange }: TabProps<T>) => (
  <div
    onClick={() => onChange(value)}
    className={`
      p-1 cursor-pointer whitespace-pre
      ${isActive ? 'dark:text-white text-gray-600 border-b-[0.1875rem] border-b-green' : 'text-gray-500'}
    `}
  >
    {title}
  </div>
)


export default memo(Tab)
