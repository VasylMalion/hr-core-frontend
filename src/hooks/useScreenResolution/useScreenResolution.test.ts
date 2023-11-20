import { renderHook, waitFor } from '@testing-library/react'
import { useScreenResolution } from './useScreenResolution'

describe('useScreenResolution', () => {
  it('Should initialize with window size', () => {
    const { result } = renderHook(() => useScreenResolution())
    expect(result.current.height).toBe(window.innerHeight)
    expect(result.current.width).toBe(window.innerWidth)
  })

  it('Should update size on window resize', async () => {
    const { result } = renderHook(() => useScreenResolution())
    const initialHeight = window.innerHeight
    const initialWidth = window.innerWidth

    window.innerWidth = 500
    window.innerHeight = 700
    window.dispatchEvent(new Event('resize'))

    await waitFor(() => {
      expect(result.current.height).toBe(700)
      expect(result.current.width).toBe(500)
    })

    window.innerWidth = initialWidth
    window.innerHeight = initialHeight
    window.dispatchEvent(new Event('resize'))

    await waitFor(() => {
      expect(result.current.height).toBe(initialHeight)
      expect(result.current.width).toBe(initialWidth)
    })
  })

  it('Should identify large phones correctly', async () => {
    const largePhoneWidth = 800
    window.innerWidth = largePhoneWidth

    const { result } = renderHook(() => useScreenResolution())

    await waitFor(() => {
      expect(result.current.isPhoneLarge).toBe(false)
    })

    window.innerWidth = 700
    window.dispatchEvent(new Event('resize'))

    await waitFor(() => {
      expect(result.current.isPhoneLarge).toBe(true)
    })
  })
})
