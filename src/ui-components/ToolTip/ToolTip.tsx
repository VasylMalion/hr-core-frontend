import { FunctionComponent, ReactNode, useState, memo } from 'react'
import { CSSTransition } from 'react-transition-group'

type ToolTipProps = {
  children: ReactNode
  text: string
}

const ToolTip: FunctionComponent<ToolTipProps> = ({ children, text }) => {
  const [showToolTip, setShowToolTip] = useState(false)

  const classNames = {
    enter: 'opacity-0',
    enterActive: 'opacity-100 transition-opacity duration-300 ease-in-out',
    exitActive: 'opacity-0 transition-opacity duration-300 ease-in-out',
  }

  const onMouseEnterHandler = () => setShowToolTip(true)
  const onMouseLeaveHandler = () => setShowToolTip(false)

  if (!text) return children

  const toolTipStyles = `absolute w-max m-[3.25rem] flex justify-center items-center py-1 px-3 
    text-white bg-gray-500 rounded-md h-7 text-sm before:absolute before:border-y-4
    before:border-r-4 before:border-y-transparent before:border-r-gray-500 before:top-[calc(50%_-_0.3125rem)] 
    before:ml-[-0.25rem] before:w-0 before:h-0 before:left-0`

  return (
    <div
      className='relative flex items-center'
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      <CSSTransition
        in={showToolTip}
        timeout={300}
        classNames={classNames}
        unmountOnExit
      >
        <div className={toolTipStyles}>
          {text}
        </div>
      </CSSTransition>
    </div>
  )
}

export default memo(ToolTip)