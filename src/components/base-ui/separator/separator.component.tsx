import './style.css'
import { Separator as SeparatorPrimititve } from '@base-ui/react/separator'

export function Separator({
  variant = 'line',
  orientation = 'horizontal',
  ...props
}: SeparatorPrimititve.Props & {
  variant?: 'line' | 'solid-text' | 'content' | 'underline'
}) {
  return (
    <SeparatorPrimititve
      data-ui='separator'
      data-variant={variant}
      orientation={orientation}
      data-orientation={orientation}
      {...props}
    />
  )
}
