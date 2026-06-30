import './style.css'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

type BadgeProps = useRender.ComponentProps<'span'> & {
  variant?: 'light' | 'stroke'
  status: 'success' | 'warning' | 'failed' | 'disabled' | 'info'
  doted?: boolean
}

function StatusBadge({ render, status, variant, doted, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({}, props),
    render,
    state: {
      ui: 'status-badge',
      variant: variant || 'light',
      doted: !!doted,
      status
    }
  })
}

export { StatusBadge }
