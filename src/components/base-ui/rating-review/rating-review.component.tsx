import { FavouriteIcon, StarIcon } from '@hugeicons/core-free-icons'
import './style.css'
import { HugeiconsIcon } from '@hugeicons/react'
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
  const icon = variant === 'star' ? StarIcon : FavouriteIcon
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
        <HugeiconsIcon key={num} icon={icon} data-filled={num <= value} />
      ))}
    </div>
  )
}

export { RatingReview }
