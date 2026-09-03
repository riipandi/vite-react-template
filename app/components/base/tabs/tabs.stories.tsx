import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs.component'

const meta = {
  title: 'Base Components/Tabs',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Tabs>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: 'account' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value='password'>
        <p>Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}
