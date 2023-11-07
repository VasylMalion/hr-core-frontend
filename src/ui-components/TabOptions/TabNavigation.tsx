import Tab, {TabOption} from './Tab'

type TabNavigationProps<T> = {
  options: Array<TabOption<T>>
  value: T
  onChange?: (value: T) => void
}

const TabNavigation = <T extends unknown>({ options, value, onChange }: TabNavigationProps<T>) => (
  <div className='overflow-x-auto'>
    <div className='flex gap-8 border-b border-grayLight'>
      {
        options.map((item, index) => (
          <Tab
            key={index}
            title={item.title}
            value={item.value}
            isActive={item.value === value}
            onChange={onChange}
          />
        ))
      }
    </div>
  </div>
)

export default TabNavigation
