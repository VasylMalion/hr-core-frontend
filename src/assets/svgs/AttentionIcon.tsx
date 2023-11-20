import { FunctionComponent, memo } from 'react'

type IconProps = {
  className?: string
  onClick?: () => void
}

const AttentionIcon: FunctionComponent<IconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      width="240px"
      height="240px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M2 20V4C2 3.44772 2.44772 3 3 3H8.44792C8.79153 3 9.11108 3.17641 9.29416 3.46719L10.5947 5.53281C10.7778 5.82359 11.0974 6 11.441 6H21C21.5523 6 22 6.44772 22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20Z"
        strokeWidth="1"
      />
      <path
        d="M12 14L12 10"
        className="stroke-current"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="17"
        r="1"
        transform="rotate(-180 12 17)"
      />
    </svg>
  )
}

export default memo(AttentionIcon)
