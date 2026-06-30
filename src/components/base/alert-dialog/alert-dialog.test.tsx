import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AlertDialog, AlertDialogTrigger } from './alert-dialog.component'

describe('AlertDialog', () => {
  it('renders trigger', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open dialog</AlertDialogTrigger>
      </AlertDialog>
    )
    expect(screen.getByText('Open dialog')).toBeDefined()
  })
})
