import { FunctionComponent, memo } from 'react'

type IconProps = {
  className?: string
  onClick?: () => void
}

const LogoutIcon: FunctionComponent<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
    >
      <polyline points="14 7 14 2 2 2 2 22 14 22 14 17" />
      <line x1="10" y1="12" x2="22" y2="12" />
      <polyline points="18 8 22 12 18 16" />
    </svg>
  )
}

export default memo(LogoutIcon)
