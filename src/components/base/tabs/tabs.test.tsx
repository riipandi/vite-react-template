import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tabs, TabsList, TabsItem, TabsPanel } from './tabs.component'

describe('Tabs', () => {
  it('renders with tab and panel', () => {
    render(
      <Tabs defaultValue='a'>
        <TabsList>
          <TabsItem value='a'>Tab A</TabsItem>
        </TabsList>
        <TabsPanel value='a'>Panel A</TabsPanel>
      </Tabs>
    )
    expect(screen.getByText('Tab A')).toBeDefined()
  })
})
