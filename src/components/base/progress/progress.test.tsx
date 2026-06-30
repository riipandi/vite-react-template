import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Progress, ProgressLabel } from './progress.component'

describe('Progress', () => {
  it('renders label', () => {
    render(
      <Progress value={50}>
        <ProgressLabel>Loading</ProgressLabel>
      </Progress>
    )
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
