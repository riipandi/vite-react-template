import './style.css'

function Textarea(props: React.ComponentProps<'textarea'>) {
  return <textarea data-ui='textarea' {...props} />
}

export { Textarea }
