import { FunctionComponent, memo } from 'react'

const LoadingComponent: FunctionComponent = () => {

  const divStyles = 'inline-block absolute w-8 md:w-12 bg-white animate-loaderMobile md:animate-loader'

  return (
    <div className='flex justify-center items-center h-[50vh]'>
      <div className='inline-block relative w-40 h-40 md:w-60 md:h-60'>
        <div className={`${divStyles} left-4 md:left-6 animation-delay-0`} />
        <div className={`${divStyles} left-16 md:left-24 animation-delay-150`} />
        <div className={`${divStyles} left-28 md:left-[10.5rem] animation-delay-300`} />
      </div>
    </div>
  )
}

export default memo(LoadingComponent)
