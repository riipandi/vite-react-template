import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import App from '#/app'

describe('Homepage', () => {
  test('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })
})
