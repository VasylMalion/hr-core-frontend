import { FunctionComponent, ReactNode } from "react"
import Tab from "./Tab";

type TabNavigationProps = {
  options: Array<{
    title: string;
    type: string;
  }>
  value: string
  onChange?: (value: any) => void
}
const TabNavigation: FunctionComponent<TabNavigationProps> = ({ options, value, onChange }) => {

  return (
    <div className='overflow-x-auto'>
      <div className='flex gap-8 border-b border-greyLight'>
        {
          options.map(item => (
            <Tab
              key={item.type}
              title={item.title}
              value={item.type}
              isActive={item.type === value}
              onChange={onChange}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TabNavigation
