import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Radio, RadioGroup } from '#/components/base/radio'
import { Item, ItemAction, ItemContent, ItemDescription, ItemTitle } from '#/components/extra/item'
import { Label } from '#/components/extra/label'

const meta = {
  title: 'Base Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { value: null },
  render: () => (
    <RadioGroup defaultValue='da-vinci' aria-labelledby='radio-example'>
      <Label>
        <Radio value='da-vinci' />
        The Da Vinci Code
      </Label>
      <Label>
        <Radio value='angels-demons' />
        Angels & Demons
      </Label>
      <Label>
        <Radio value='inferno' />
        Inferno
      </Label>
    </RadioGroup>
  )
}

export const WithItem: Story = {
  args: { value: null },
  render: () => (
    <RadioGroup {...stylex.props(x.width['100%'], x.gap['1rem'])}>
      <Item render={<Label />} variant='outline'>
        <ItemContent {...stylex.props(x.paddingLeft['0.25rem'], x.paddingRight['0.25rem'])}>
          <ItemTitle>Standard Wand</ItemTitle>
          <ItemDescription>10 Galleons - Suitable for beginners</ItemDescription>
        </ItemContent>
        <ItemAction {...stylex.props(x.padding['0.5rem'])}>
          <Radio value='standard' />
        </ItemAction>
      </Item>
      <Item render={<Label />} variant='outline'>
        <ItemContent {...stylex.props(x.paddingLeft['0.25rem'], x.paddingRight['0.25rem'])}>
          <ItemTitle>Premium Wand</ItemTitle>
          <ItemDescription>100 Galleons - Professional quality</ItemDescription>
        </ItemContent>
        <ItemAction {...stylex.props(x.padding['0.5rem'])}>
          <Radio value='premium' />
        </ItemAction>
      </Item>
    </RadioGroup>
  )
}
