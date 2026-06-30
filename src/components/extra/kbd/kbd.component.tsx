import './style.css'

function Kbd(props: React.ComponentProps<'kbd'>) {
  return <kbd data-ui='kbd' {...props} />
}

function KbdGroup(props: React.ComponentProps<'div'>) {
  return <div data-ui='kbd-group' {...props} />
}

export { Kbd, KbdGroup }
