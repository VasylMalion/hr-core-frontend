import { FunctionComponent, ReactNode, memo } from 'react'

import { Status } from 'common/types/common'

import LoadingComponent from './LoadingComponent'
import FailComponent from './FailComponent'

type WithPreloadProps = {
  children: ReactNode
} & Status

const WithPreload: FunctionComponent<WithPreloadProps> = ({
  children,
  isLoading,
  isSuccess,
  isError,
}) => {

  const getContent = () => {
    {if (isLoading) return <LoadingComponent />}
    {if (isError && !isLoading) return <FailComponent />}
    {if (isSuccess && !isLoading) return children}
  }

  return <>{getContent()}</>
}

export default memo(WithPreload)