import { describe, expect, it } from 'vitest'
import { toastManager } from './toast.component'

describe('Toast', () => {
  it('creates a toast manager', () => {
    expect(toastManager).toBeDefined()
  })
})
