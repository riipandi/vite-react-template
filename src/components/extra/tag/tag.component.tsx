import * as Lucide from 'lucide-react'
import { createContext, useContext } from 'react'
import { Button } from '../../base/button'
import './style.css'

const TagContext = createContext<{ disabled?: boolean }>({})

function Tag({
  disabled,
  variant = 'stroke',
  ...props
}: React.ComponentProps<'div'> & {
  disabled?: boolean
  variant?: 'lighter' | 'stroke'
}) {
  return (
    <TagContext.Provider value={{ disabled }}>
      <div data-ui='tag' data-variant={variant} aria-disabled={disabled} {...props} />
    </TagContext.Provider>
  )
}

function TagDismiss(props: React.ComponentProps<'button' | typeof Button>) {
  const { disabled } = useContext(TagContext)

  return (
    <Button
      data-slot='tag-dismiss'
      variant='neutral'
      mode='ghost'
      asIcon
      size='sm'
      disabled={disabled}
      {...props}
    >
      <Lucide.X size={16} />
    </Button>
  )
}

export { Tag, TagDismiss }
