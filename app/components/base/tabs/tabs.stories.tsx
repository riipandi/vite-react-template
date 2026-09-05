import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { BellIcon, UserIcon } from 'lucide-react'
import { expect, userEvent } from 'storybook/test'
import { container } from '#/styles/core/tokens.stylex'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs.component'

const meta = {
  title: 'Base Components/Tabs',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Tabs>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  tabs: {
    width: container.large
  },
  trigger: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: 6
  },
  icon: { width: 16, height: 16 }
})

export default meta

export const Playground: Story = {
  args: { defaultValue: 'account' },
  render: (args) => (
    <Tabs {...args} style={styles.tabs}>
      <TabsList>
        <TabsTrigger value='account'>Gringotts Vault</TabsTrigger>
        <TabsTrigger value='password'>Vault Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>Manage your vault at Gringotts.</TabsContent>
      <TabsContent value='password'>Change the password to your vault.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const account = canvas.getByRole('tab', { name: 'Gringotts Vault' })
    const password = canvas.getByRole('tab', { name: 'Vault Password' })

    expect(account).toHaveAttribute('aria-selected', 'true')
    expect(canvas.getByText('Manage your vault at Gringotts.')).toBeInTheDocument()

    // Clicking a trigger swaps the visible panel.
    await userEvent.click(password)
    expect(password).toHaveAttribute('aria-selected', 'true')
    expect(account).toHaveAttribute('aria-selected', 'false')
    expect(canvas.getByText('Change the password to your vault.')).toBeInTheDocument()
  }
}

export const Line: Story = {
  name: 'Line variant',
  args: { defaultValue: 'overview' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant='line'>
        <TabsTrigger value='overview'>Daily Prophet</TabsTrigger>
        <TabsTrigger value='analytics'>The Quibbler</TabsTrigger>
        <TabsTrigger value='reports'>Ministry Briefings</TabsTrigger>
      </TabsList>
      <TabsContent value='overview'>The latest from the Daily Prophet.</TabsContent>
      <TabsContent value='analytics'>Theories from Luna Lovegood.</TabsContent>
      <TabsContent value='reports'>Notices from the Ministry of Magic.</TabsContent>
    </Tabs>
  )
}

export const Disabled: Story = {
  name: 'Disabled tab',
  args: { defaultValue: 'active' },
  render: (args) => (
    <Tabs {...args} style={styles.tabs}>
      <TabsList>
        <TabsTrigger value='active'>Hogsmeade</TabsTrigger>
        <TabsTrigger value='disabled' disabled>
          Azkaban
        </TabsTrigger>
      </TabsList>
      <TabsContent value='active'>The other tab is locked away in Azkaban.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const locked = canvas.getByRole('tab', { name: 'Azkaban' })
    expect(locked).toHaveAttribute('data-disabled')

    await userEvent.click(locked)
    expect(locked).toHaveAttribute('aria-selected', 'false')
    expect(canvas.getByRole('tab', { name: 'Hogsmeade' })).toHaveAttribute('aria-selected', 'true')
  }
}

export const Vertical: Story = {
  args: { defaultValue: 'profile', orientation: 'vertical' },
  render: (args) => (
    <Tabs {...args} style={styles.tabs}>
      <TabsList>
        <TabsTrigger value='profile'>Prefect</TabsTrigger>
        <TabsTrigger value='account'>Gringotts Vault</TabsTrigger>
        <TabsTrigger value='notifications'>Owl Post</TabsTrigger>
      </TabsList>
      <TabsContent value='profile'>Update your name at Hogwarts.</TabsContent>
      <TabsContent value='account'>Manage your vault details.</TabsContent>
      <TabsContent value='notifications'>Choose which owls you receive.</TabsContent>
    </Tabs>
  )
}

export const Icons: Story = {
  args: { defaultValue: 'account' },
  render: (args) => (
    <Tabs {...args} style={styles.tabs}>
      <TabsList>
        <TabsTrigger value='account' style={styles.trigger}>
          <UserIcon {...stylex.props(styles.icon)} />
          Wizard Profile
        </TabsTrigger>
        <TabsTrigger value='notifications' style={styles.trigger}>
          <BellIcon {...stylex.props(styles.icon)} />
          Owl Post
        </TabsTrigger>
      </TabsList>
      <TabsContent value='account'>Update your wizard profile.</TabsContent>
      <TabsContent value='notifications'>Manage your owl post preferences.</TabsContent>
    </Tabs>
  )
}
