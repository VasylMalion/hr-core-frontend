import React from 'react'
import { FunctionComponent, ReactNode, memo } from 'react'

type TypographyProps = {
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  appearance: 'title' | 'subtitle'
  className?: string
  children: ReactNode
}

const Typography: FunctionComponent<TypographyProps> = ({
  tag = 'p',
  appearance,
  className,
  children,
}) => {
  const TypographyTag = tag

  return (
    <TypographyTag
      className={`
          font-[ceraProBold] mb-4 text-black dark:text-white ${className}
          ${appearance === 'title' ? 'text-2xl' : 'text-lg'}
        `}
    >
      {children}
    </TypographyTag>
  )
}

export default memo(Typography)
