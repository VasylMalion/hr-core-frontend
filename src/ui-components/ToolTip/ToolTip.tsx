import { FunctionComponent, ReactNode, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type ToolTipProps = {
  children: ReactNode;
  text: string;
};

const ToolTip: FunctionComponent<ToolTipProps> = ({ children, text }) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const classNames = {
    enter: 'opacity-0',
    enterActive: 'opacity-100 transition-opacity duration-300 ease-in-out',
    exitActive: 'opacity-0 transition-opacity duration-300 ease-in-out',
  }

  const onMouseEnterHandler = () => setShowToolTip(true)
  const onMouseLeaveHandler = () => setShowToolTip(false)

  if (!text) return children

  const toolTipStyles = `absolute w-max m-[3.25rem] flex justify-center items-center py-[0.25rem] px-[0.75rem] 
    text-[#FFFFFF] bg-[#222338] rounded-[5px] h-[28px] text-[14px] before:absolute before:border-y-[5px] 
    before:border-r-[5px] before:border-y-transparent before:border-r-[#222338] before:top-[calc(50%_-_5px)] 
    before:ml-[-5px] before:w-0 before:h-0 before:left-0`

  return (
    <div className='relative flex items-center' onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
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
  );
};

export default ToolTip;