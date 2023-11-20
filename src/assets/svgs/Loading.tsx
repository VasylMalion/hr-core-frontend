import { FunctionComponent, memo } from 'react'

const Loading: FunctionComponent = () => {
  return (
    <div
      data-testid="loading-svg"
      className="w-4 h-4 rounded-full border-[0.1875rem]	border-current border-l-transparent animate-loading"
    />
  )
}

export default memo(Loading)
