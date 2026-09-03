import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Badge } from '#/components/extra/badge'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from './item.component'

const meta = {
  title: 'Extra Components/Item',
  component: Item,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Item>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <ItemGroup>
      <Item>
        <ItemMedia variant='icon'>🔔</ItemMedia>
        <ItemContent>
          <ItemTitle>Notifications</ItemTitle>
          <ItemDescription>Updates about your account and projects.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant='outline'>2 new</Badge>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item size='sm'>
        <ItemMedia variant='icon'>🚀</ItemMedia>
        <ItemContent>
          <ItemTitle>Releases</ItemTitle>
          <ItemDescription>Changelog and version announcements.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}
