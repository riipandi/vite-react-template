import './style.css'
import * as Lucide from 'lucide-react'
import { Button } from '../../base/button'

interface Props {
  variant: 'filled' | 'light' | 'lighter' | 'stroke'
  status: 'error' | 'warning' | 'success' | 'information' | 'feature'
  size?: 'sm' | 'md' | 'lg'
}

function Alert({ variant, status, size = 'md', ...props }: React.ComponentProps<'div'> & Props) {
  return (
    <div data-ui='alert' data-variant={variant} data-status={status} data-size={size} {...props} />
  )
}

function AlertContent({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='alert-content' {...props} />
}

function AlertTitle({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='alert-title' {...props} />
}

function AlertDescription({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='alert-description' {...props} />
}

function AlertIcon({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='alert-icon' {...props} />
}

function AlertClose(props: React.ComponentProps<'button'>) {
  return (
    <Button data-slot='alert-close' asIcon size='sm' {...props}>
      <Lucide.X size={16} />
    </Button>
  )
}

export { Alert, AlertContent, AlertTitle, AlertDescription, AlertIcon, AlertClose }
