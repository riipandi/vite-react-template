import './style.css'

interface Props {
  fluid?: boolean
}

function Card({ fluid = false, ...props }: React.ComponentProps<'div'> & Props) {
  return <div data-ui='card' data-fluid={fluid} {...props} />
}

export { Card }
