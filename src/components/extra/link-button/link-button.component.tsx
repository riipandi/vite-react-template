// oxlint-disable jsx-a11y/anchor-has-content

import './style.css'

function LinkButton({
  size = 'md',
  underline = true,
  variant = 'black',
  ...props
}: React.ComponentProps<'a'> & {
  variant?: 'gray' | 'black' | 'primary' | 'error'
  size?: 'sm' | 'md'
  underline?: boolean
}) {
  return (
    <a
      data-ui='link-button'
      data-variant={variant}
      data-size={size}
      data-underline={underline}
      {...props}
    />
  )
}

export { LinkButton }
