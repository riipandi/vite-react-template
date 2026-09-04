import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { FileTextIcon, MicIcon, SearchIcon, SparklesIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { LoaderText } from './loader-text.component'

const meta = {
  title: 'Extra Components/LoaderText',
  component: LoaderText,
  parameters: { layout: 'centered' },
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

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
})

export default meta

export const Playground: Story = {
  args: {
    icon: MicIcon,
    completed: false,
    completedText: 'Recorded audio',
    children: 'Recording audio'
  },
  render: (args) => <LoaderText {...args} />
}

export const WithoutIcon: Story = {
  name: 'Text only',
  args: { children: 'Inspecting code' },
  render: (args) => <LoaderText {...args} />
}

export const Completed: Story = {
  render: () => {
    const [completed, setCompleted] = React.useState(false)

    return (
      <div {...stylex.props(styles.stack)}>
        <LoaderText completed>Inspected 5 files</LoaderText>
        <LoaderText icon={MicIcon} completed={completed} completedText='Recorded audio'>
          Recording audio
        </LoaderText>
        <div>
          <Button variant='outline' size='sm' onClick={() => setCompleted((value) => !value)}>
            {completed ? 'Restart' : 'Complete'}
          </Button>
        </div>
      </div>
    )
  }
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
      <LoaderText icon={FileTextIcon} completed completedText='Read 3 files'>
        Reading files
      </LoaderText>
      <LoaderText icon={SearchIcon} completedText='Searched 128 files'>
        Searching the codebase
      </LoaderText>
      <LoaderText icon={SparklesIcon} completedText='Draft ready'>
        Drafting a response
      </LoaderText>
    </div>
  )
}
