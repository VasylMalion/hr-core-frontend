import { renderHook, act, waitFor } from '@testing-library/react'
import { useDebounce } from './useDebounce'

jest.useFakeTimers()

describe('useDebounce', () => {
  it('Should return empty string initially', () => {
    const { result } = renderHook(() => useDebounce({ value: '' }))
    expect(result.current).toBe('')
  })

  it('Should debounce the input value', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce({ value }),
      {
        initialProps: { value: '' },
      }
    )

    act(() => {
      rerender({ value: 'a' })
      jest.advanceTimersByTime(100)
    })

    expect(result.current).toBe('')

    act(() => {
      rerender({ value: 'ab' })
      jest.advanceTimersByTime(200)
    })

    expect(result.current).toBe('')

    act(() => {
      rerender({ value: 'abc' })
      jest.advanceTimersByTime(400)
    })

    await waitFor(() => {
      expect(result.current).toBe('abc')
    })
  })
})
