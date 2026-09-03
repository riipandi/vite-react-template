import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from './preview-card.component'

const meta = {
  title: 'Base Components/PreviewCard',
  component: PreviewCard,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof PreviewCard>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCardTrigger render={<Button variant='ghost'>Hover me</Button>} />
      <PreviewCardContent>
        <p>
          <strong>@riipandi</strong> — full-stack developer building with React, TypeScript, and
          Rust.
        </p>
      </PreviewCardContent>
    </PreviewCard>
  )
}
