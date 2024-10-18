import type { Meta } from '@storybook/react'

import { Tag, TagGroup } from '#/components/ui-react-aria/TagGroup'

const meta: Meta<typeof Example> = {
  component: TagGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = (args: any) => (
  <TagGroup {...args}>
    <Tag>Chocolate</Tag>
    <Tag>Mint</Tag>
    <Tag>Strawberry</Tag>
    <Tag>Vanilla</Tag>
  </TagGroup>
)

Example.args = {
  label: 'Ice cream flavor',
  selectionMode: 'single',
}
