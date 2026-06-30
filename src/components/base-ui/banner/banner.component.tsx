import './style.css'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../button'

function Banner({
  variant = 'filled',
  status = 'feature',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'filled' | 'light' | 'lighter' | 'stroke'
  status?: 'error' | 'warning' | 'success' | 'info' | 'feature'
}) {
  return <div data-ui='banner' data-status={status} data-variant={variant} {...props} />
}

function BannerContent({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='banner-content' {...props} />
}

function BannerIcon({ ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='banner-icon' {...props} />
}

function BannerClose({ ...props }: React.ComponentProps<'button'>) {
  return (
    <Button data-slot='banner-close' variant='neutral' mode='ghost' size='sm' asIcon {...props}>
      <HugeiconsIcon icon={Cancel01Icon} />
    </Button>
  )
}

export { Banner, BannerContent, BannerClose, BannerIcon }
