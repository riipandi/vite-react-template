import { describe, expect, it } from 'vitest'
import { renderPage } from '../helpers'

describe('Homepage', () => {
  it('should render successfully', async () => {
    const { baseElement } = await renderPage('/')
    expect(baseElement).toBeTruthy()
  })
})
