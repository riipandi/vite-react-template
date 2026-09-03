import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible.component'

const meta = {
  title: 'Base Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Collapsible>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger render={<Button variant='outline'>Toggle content</Button>} />
      <CollapsibleContent>
        <p>This panel expands and collapses with a height animation.</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
