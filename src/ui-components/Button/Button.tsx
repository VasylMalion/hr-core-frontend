import { FunctionComponent, ReactNode } from "react"

import Loading from "assets/svgs/Loading/Loading"

type ButtonProps = {
  icon?: ReactNode
  type?: 'primary' | 'secondary'
  onClick?: () => void
  children?: ReactNode
  className?: string
  textAlign?: 'center' | 'start' | 'end'
  isLoading?: boolean
  disabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  icon,
  children,
  isLoading,
  disabled,
  className,
  onClick,
  type = 'primary',
  textAlign = 'start'
}) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        `min-w-[8rem] flex align-center gap-3 py-3 px-6 font-[ceraProMedium] text-sm rounded-md items-center
        ${className} 
        ${disabled && '!text-[#00000042] !bg-[#0000001f] cursor-not-allowed'}
        ${type === 'primary' && 'text-[white] bg-blue fill-white'}
        ${type === 'secondary' && 'fill-[#787878] text-[#787878]'}
        ${textAlign === 'start' && 'justify-start'}
        ${textAlign === 'center' && 'justify-center'}
        ${textAlign === 'end' && 'justify-end'}
        `
      }
    >
      {isLoading && <Loading />}
      {icon && !isLoading && <span className='w-[20px] h-[20px]'>{icon}</span>}
      {!!children && children}
    </button>
  )
}

export default Button
