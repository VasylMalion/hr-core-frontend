import { FunctionComponent, ReactNode, MouseEvent, memo } from 'react'

import Loading from 'assets/svgs/Loading'

type ButtonProps = {
  icon?: ReactNode
  type?: 'primary' | 'secondary'
  onClick?: (event: MouseEvent<HTMLElement>) => void
  children?: ReactNode
  className?: string
  textAlign?: 'center' | 'start' | 'end'
  isLoading?: boolean
  disabled?: boolean
  testId?: string 
}

const Button: FunctionComponent<ButtonProps> = ({
  icon,
  children,
  isLoading,
  disabled,
  className,
  onClick,
  type = 'primary',
  textAlign = 'start',
  testId,
}) => {

  return (
    <button
      data-testid={testId}
      onClick={onClick}
      disabled={(disabled || isLoading)}
      className={`
        min-w-[8rem] flex align-center gap-3 py-3 px-6 font-[ceraProMedium] text-sm rounded-md items-center
        ${className} 
        ${disabled && '!text-[#00000042] !bg-[#0000001f] dark:!text-white dark:!bg-dark-100 cursor-not-allowed'}
        ${type === 'primary' && 'text-[white] bg-blue fill-white'}
        ${type === 'secondary' && 'fill-gray-400 text-gray-400 dark:text-gray-100 dark:fill-gray-100'}
        ${textAlign === 'start' && 'justify-start'}
        ${textAlign === 'center' && 'justify-center'}
        ${textAlign === 'end' && 'justify-end'}
      `}
    >
      {isLoading && <Loading />}
      {icon && !isLoading && <span className='w-5 h-5'>{icon}</span>}
      {!!children && children}
    </button>
  )
}

export default memo(Button)
