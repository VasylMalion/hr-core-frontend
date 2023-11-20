import { FunctionComponent, memo } from 'react'

type IconProps = {
  className?: string
  onClick?: () => void
}

const NoResultIcon: FunctionComponent<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-icon="no-result"
      className={className}
      onClick={onClick}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
    >
      <path
        d="M15 18.5L20 13.5M20 18.5L15 13.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 14L3 14" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 18H3" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M3 6L13.5 6M20 6L17.75 6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 10L9.5 10M3 10H5.25"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default memo(NoResultIcon)
