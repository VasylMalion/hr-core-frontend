import { useEffect, useState } from 'react'

const PHONE_LARGE = 767

type Size = {
  height: number
  width: number
  isPhoneLarge: boolean
}

export const useScreenResolution = (): Size => {
  const [size, setSize] = useState<Pick<Size, 'height' | 'width'>>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const resize = (event: Event) => {
    const { innerWidth, innerHeight } = event.currentTarget as Window
    setSize({
      height: innerHeight,
      width: innerWidth,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return { ...size, isPhoneLarge: size.width <= PHONE_LARGE }
}