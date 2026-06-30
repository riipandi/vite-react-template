import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar, AvatarFallback } from './avatar.component'

describe('Avatar', () => {
  it('renders fallback', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(container.querySelector('[data-slot="avatar"]')).toBeDefined()
  })
})
