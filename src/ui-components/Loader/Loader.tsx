import { FunctionComponent } from "react"

const Loader: FunctionComponent = () => {

  const divStyles = 'inline-block absolute w-[2rem] md:w-[3rem] bg-white animate-loaderMobile md:animate-loader'

  return (
    <div className='inline-block relative w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem]'>
      <div className={`${divStyles} left-[1rem] md:left-[1.5rem] animation-delay-0`} />
      <div className={`${divStyles} left-[4rem] md:left-[6rem] animation-delay-150`} />
      <div className={`${divStyles} left-[7rem] md:left-[10.5rem] animation-delay-300`} />
    </div>
  )
}

export default Loader
