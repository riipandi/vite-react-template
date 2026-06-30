import './style.css'

interface Props {
  fluid?: boolean
}

function Container({ fluid = false, ...props }: React.ComponentProps<'div'> & Props) {
  return <div data-ui='container' data-fluid={fluid} {...props} />
}

export { Container }
