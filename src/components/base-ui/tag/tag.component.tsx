import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createContext, useContext } from 'react'
import './style.css'
import { Button } from '../button'

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
      <HugeiconsIcon icon={Cancel01Icon} />
    </Button>
  )
}

export { Tag, TagDismiss }
