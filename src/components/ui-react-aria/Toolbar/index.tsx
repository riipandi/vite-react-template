import {
  Toolbar as AriaToolbar,
  type ToolbarProps,
  composeRenderProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'flex gap-2',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start',
    },
  },
})

export function Toolbar(props: ToolbarProps) {
  return (
    <AriaToolbar
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    />
  )
}
