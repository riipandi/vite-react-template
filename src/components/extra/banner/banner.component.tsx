import './style.css'
import * as Lucide from 'lucide-react'
import { Button } from '../../base/button'

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
      <Lucide.X size={16} />
    </Button>
  )
}

export { Banner, BannerContent, BannerClose, BannerIcon }
