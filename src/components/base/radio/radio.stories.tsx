import type { Meta, StoryObj } from '@storybook/react-vite'
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
      <div className='flex w-full min-w-md items-center justify-center'>
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
    <RadioGroup className='w-full gap-4'>
      <Item render={<Label />} variant='outline'>
        <ItemContent className='px-1'>
          <ItemTitle>Standard Wand</ItemTitle>
          <ItemDescription>10 Galleons - Suitable for beginners</ItemDescription>
        </ItemContent>
        <ItemAction className='p-2'>
          <Radio value='standard' />
        </ItemAction>
      </Item>
      <Item render={<Label />} variant='outline'>
        <ItemContent className='px-1'>
          <ItemTitle>Premium Wand</ItemTitle>
          <ItemDescription>100 Galleons - Professional quality</ItemDescription>
        </ItemContent>
        <ItemAction className='p-2'>
          <Radio value='premium' />
        </ItemAction>
      </Item>
    </RadioGroup>
  )
}
