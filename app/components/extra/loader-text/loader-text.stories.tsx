import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { LoaderText } from './loader-text.component'

const meta = {
  title: 'Extra Components/LoaderText',
  component: LoaderText,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['featured-4', 'featured-5', 'body-1', 'body-2', 'caption-1']
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold']
    },
    color: {
      control: 'select',
      options: [
        'neutral',
        'neutral-faded',
        'positive',
        'warning',
        'critical',
        'primary',
        'disabled'
      ]
    }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding('16px'), atoms.width('100%'))}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof LoaderText>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: {
    icon: Lucide.Search,
    completed: false,
    completedText: 'Searched 128 files',
    children: 'Searching the codebase'
  },
  render: (args) => <LoaderText {...args} />
}

export const WithoutIcon: Story = {
  args: { children: 'Generating a response' },
  render: (args) => <LoaderText {...args} />
}

export const Completed: Story = {
  args: {
    icon: Lucide.Search,
    completed: true,
    completedText: 'Searched 128 files',
    children: 'Searching the codebase'
  },
  render: (args) => <LoaderText {...args} />
}

export const Sequence: Story = {
  render: () => (
    <div
      {...stylex.props(
        atoms.display('flex'),
        atoms.flexDirection('column'),
        atoms.gap['12px'],
        atoms.width('100%')
      )}
    >
      <LoaderText icon={Lucide.FileText} completed completedText='Read 3 files'>
        Reading files
      </LoaderText>
      <LoaderText icon={Lucide.Search} completedText='Searched 128 files'>
        Searching the codebase
      </LoaderText>
      <LoaderText icon={Lucide.Sparkles} completedText='Draft ready'>
        Drafting a response
      </LoaderText>
    </div>
  )
}
