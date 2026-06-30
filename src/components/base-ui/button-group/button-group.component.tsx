import { Separator } from '../separator'
import './style.css'

function ButtonGroup({
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
}) {
  return <div role='group' data-ui='button-group' data-orientation={orientation} {...props} />
}

function ButtonGroupSeparator({
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot='button-group-separator' orientation={orientation} {...props} />
}

export { ButtonGroup, ButtonGroupSeparator }
