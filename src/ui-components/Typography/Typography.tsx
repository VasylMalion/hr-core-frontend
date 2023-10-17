import { FunctionComponent, ReactNode } from "react"

type TypographyProps = {
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  appearance: 'title' | 'subtitle'
  color?: 'light' | 'dark'
  className?: string
  children: ReactNode
}

const Typography: FunctionComponent<TypographyProps> = ({ tag = 'p', appearance, color = 'light', className, children }) => {

  const TypographyTag = tag

  return <TypographyTag className={
    `font-[ceraProBold] mb-4
    ${className}
    ${appearance === 'title' ? 'text-2xl' : 'text-lg'}
    ${color === 'light' ? '' : ''}
    `
  }>
    {children}
  </TypographyTag>
}

export default Typography