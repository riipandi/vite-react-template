import './style.css'
import { RadioGroup, RadioGroupItem } from '../../base/radio'

function RatingBar({
  size = 'md',
  styling,
  ...props
}: React.ComponentProps<typeof RadioGroup> & {
  size?: 'sm' | 'md' | 'lg'
  styling?: 'star' | 'heart'
}) {
  return <RadioGroup data-ui='rating-bar' data-styling={styling} data-size={size} {...props} />
}

function RatingBarItem(props: React.ComponentProps<typeof RadioGroupItem>) {
  return <RadioGroupItem data-ui='rating-bar-item' {...props} />
}

export { RatingBar, RatingBarItem }
