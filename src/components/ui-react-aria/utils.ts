import { twMerge } from 'tailwind-merge'

export function ctrp<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  if (typeof className === 'function') {
    return (v: T) => twMerge(tw, className(v))
  }
  return twMerge(tw, className ?? '')
}
