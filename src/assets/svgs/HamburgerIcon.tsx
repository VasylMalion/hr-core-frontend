import { FunctionComponent, memo } from 'react'

type IconProps = {
  id?: string
  className?: string
  onClick?: () => void
}

const HamburgerIcon: FunctionComponent<IconProps> = ({
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      id={id}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
    >
      <path d="M4 18L20 18" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12L20 12" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 6L20 6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default memo(HamburgerIcon)
