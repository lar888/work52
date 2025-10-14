export const debounce = <T extends unknown[], U>(
  func: (...args: T) => U,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: T): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}
