import './style.css'

function Skeleton({
  rounded = false,
  ...props
}: React.ComponentProps<'div'> & { rounded?: boolean }) {
  return <div data-ui='skeleton' data-rounded={rounded} {...props} />
}

export { Skeleton }
