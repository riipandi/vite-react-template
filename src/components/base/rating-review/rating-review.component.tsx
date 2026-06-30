import './style.css'
import * as Lucide from 'lucide-react'
import type React from 'react'

function RatingReview({
  variant = 'star',
  value = 0,
  max = 5,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'star' | 'heart'
  value?: number
  max?: number
}) {
  const Icon = variant === 'star' ? Lucide.Star : Lucide.Heart
  const items = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <div
      data-ui='rating-review'
      data-variant={variant}
      role='img'
      aria-label={`${value} out of ${max} ${variant}s`}
      {...props}
    >
      {items.map((num) => (
        <Icon key={num} size={16} data-filled={num <= value} />
      ))}
    </div>
  )
}

export { RatingReview }
