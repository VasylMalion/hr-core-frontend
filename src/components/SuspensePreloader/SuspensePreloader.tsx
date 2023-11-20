import { FunctionComponent, memo } from 'react'

import { LoadingComponent } from 'ui-components'

type SuspensePreloaderProps = {
  fullView?: boolean
}

const SuspensePreloader: FunctionComponent<SuspensePreloaderProps> = ({
  fullView,
}) => {
  return (
    <div
      data-testid="suspense-preloader"
      className={`
        flex items-center justify-center bg-purpleLight dark:bg-dark-300 
        ${fullView ? 'h-screen w-screen' : 'h-full w-full'}
      `}
    >
      <LoadingComponent />
    </div>
  )
}

export default memo(SuspensePreloader)
