import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { BellIcon, UserIcon } from 'lucide-react'
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
    width: container.lg
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
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>Make changes to your account here.</TabsContent>
      <TabsContent value='password'>Change your password here.</TabsContent>
    </Tabs>
  )
}

export const Line: Story = {
  name: 'Line variant',
  args: { defaultValue: 'overview' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant='line'>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
        <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        <TabsTrigger value='reports'>Reports</TabsTrigger>
      </TabsList>
      <TabsContent value='overview'>Overview of your project.</TabsContent>
      <TabsContent value='analytics'>Traffic and usage.</TabsContent>
      <TabsContent value='reports'>Exportable reports.</TabsContent>
    </Tabs>
  )
}

export const Disabled: Story = {
  name: 'Disabled tab',
  args: { defaultValue: 'active' },
  render: (args) => (
    <Tabs {...args} style={styles.tabs}>
      <TabsList>
        <TabsTrigger value='active'>Active</TabsTrigger>
        <TabsTrigger value='disabled' disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value='active'>The other tab is disabled.</TabsContent>
    </Tabs>
  )
}

export const Vertical: Story = {
  args: { defaultValue: 'profile', orientation: 'vertical' },
  render: (args) => (
    <Tabs {...args} style={styles.tabs}>
      <TabsList>
        <TabsTrigger value='profile'>Profile</TabsTrigger>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='notifications'>Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value='profile'>Update your name and photo.</TabsContent>
      <TabsContent value='account'>Manage your account details.</TabsContent>
      <TabsContent value='notifications'>Choose what you're notified about.</TabsContent>
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
          Account
        </TabsTrigger>
        <TabsTrigger value='notifications' style={styles.trigger}>
          <BellIcon {...stylex.props(styles.icon)} />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value='account'>Update your account settings.</TabsContent>
      <TabsContent value='notifications'>Manage notification preferences.</TabsContent>
    </Tabs>
  )
}
