import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Dialog, DialogTrigger } from './dialog.component'

describe('Dialog', () => {
  it('renders trigger', () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
      </Dialog>
    )
    expect(screen.getByText('Open dialog')).toBeDefined()
  })
})
