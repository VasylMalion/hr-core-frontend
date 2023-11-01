import { FunctionComponent, memo } from 'react'

type TabProps = {
  title: string
  value: string
  isActive?: boolean
  onChange?: (value: any) => void
}

const Tab: FunctionComponent<TabProps> = ({ title, value, isActive, onChange }) => (
  <div
    onClick={() => onChange(value)}
    className={`
      p-1 cursor-pointer whitespace-pre
      ${isActive ? 'text-gray-600 border-b-[0.1875rem] border-b-green' : 'text-gray-500'}
    `}
  >
    {title}
  </div>
)


export default memo(Tab)
