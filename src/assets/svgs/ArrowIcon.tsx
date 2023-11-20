import { FunctionComponent, memo } from 'react'

type IconProps = {
  className?: string
  onClick?: () => void
}

const ArrowIcon: FunctionComponent<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 12L6 12M6 12L11 17M6 12L11 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default memo(ArrowIcon)
