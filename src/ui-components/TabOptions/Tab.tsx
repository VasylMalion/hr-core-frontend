import { FunctionComponent, ReactNode } from "react"

type TabProps = {
  title: string
  value: string
  isActive?: boolean
  onChange?: (value: any) => void
}
const Tab: FunctionComponent<TabProps> = ({ title, value, isActive, onChange }) => {

  console.log(value)

  return (
    <div onClick={() => onChange(value)} className={`${isActive ? 'text-[#333333] border-b-[3px] border-green' : 'text-greyDark'} p-1 cursor-pointer whitespace-pre`}>
      {title}
    </div>
  )
}

export default Tab
