import { FunctionComponent, ReactNode } from "react"

type ButtonProps = {
  icon?: ReactNode
  type?: 'primary' | 'secondary'
  onClick?: () => void
  children?: ReactNode
  className?: string
}

const Button: FunctionComponent<ButtonProps> = ({ icon, children, type = 'primary', className, onClick }) => {

  return (
    <button
      className={
        `min-w-[8rem] flex align-center gap-3 py-3 px-6 font-[ceraProMedium] text-sm rounded-md
        ${className} ${type === 'primary' ? 'text-[white] bg-blue fill-white' : 'fill-[#787878] text-[#787878]'}`
      }
      onClick={onClick}
    >
      {icon && <span className='w-[20px] h-[20px]'>{icon}</span>}
      {!!children && children}
    </button>
  )
}

export default Button
