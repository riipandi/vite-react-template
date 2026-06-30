import './style.css'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

type BadgeProps = useRender.ComponentProps<'span'> & {
  mode?: 'filled' | 'light' | 'lighter' | 'stroke'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'smoothed'
  variant?: 'primary'
  doted?: boolean
  disabled?: boolean
}

function Badge({ render, variant, size, doted, shape, mode, disabled, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        'aria-disabled': disabled
      },
      props
    ),
    render,
    state: {
      ui: 'badge',
      mode: mode || 'lighter',
      size: size || 'md',
      shape: shape || 'smoothed',
      variant: variant || 'primary',
      doted: !!doted
    }
  })
}

export { Badge }
