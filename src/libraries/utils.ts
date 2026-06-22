/**
 * Merge class names, filtering out falsy values.
 * Useful when combining StyleX className with external className props.
 */
export function clx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
