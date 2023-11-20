import { FunctionComponent, memo } from 'react'

type IconProps = {
  className?: string
  onClick?: () => void
}

const LanguageIcon: FunctionComponent<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      role="img"
      aria-labelledby="languageIconTitle"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#000000"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        strokeLinecap="round"
        d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"
      />
      <path strokeLinecap="round" d="M2.5 9L21.5 9M2.5 15L21.5 15" />
    </svg>
  )
}

export default memo(LanguageIcon)
