import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '#/components/base/button'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput
} from '#/components/base/number-field'
import {
  Select,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue
} from '#/components/base/select'
import { Toggle } from '#/components/base/toggle'
import { ToggleGroup } from '#/components/base/toggle-group'
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator
} from '#/components/base/toolbar'

const meta = {
  title: 'Base Components/Toolbar',
  component: Toolbar,
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
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='pr-20'>
      <Toolbar>
        <ToolbarGroup aria-label='Indentation'>
          <ToolbarButton render={<Button color='neutral' variant='ghost' size='md' />} disabled>
            <Icon.TextIndentIcon weight='bold' />
          </ToolbarButton>
          <ToolbarButton render={<Button color='neutral' variant='ghost' size='md' />}>
            <Icon.TextOutdentIcon weight='bold' />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup aria-label='Formatting'>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle variant='ghost' size='md' />}
            aria-label='Bold'
            value='bold'
          >
            <Icon.TextBIcon weight='bold' />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle variant='ghost' size='md' />}
            aria-label='Italic'
            value='italic'
          >
            <Icon.TextItalicIcon weight='bold' />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle variant='ghost' size='md' />}
            aria-label='Underline'
            value='underline'
          >
            <Icon.TextUnderlineIcon weight='bold' />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToggleGroup variant='ghost' size='md'>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle />}
            aria-label='Align left'
            value='align-left'
          >
            <Icon.AlignLeftIcon weight='bold' />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle />}
            aria-label='Align center'
            value='align-center'
          >
            <Icon.TextAlignCenterIcon weight='bold' />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle />}
            aria-label='Align right'
            value='align-right'
          >
            <Icon.AlignRightIcon weight='bold' />
          </ToolbarButton>
        </ToggleGroup>
        <ToolbarSeparator />
        <Select defaultValue='Arial'>
          <SelectTrigger variant='ghost' className='w-24'>
            <SelectValue placeholder='Font' className='max-w-24 truncate' />
          </SelectTrigger>
          <SelectPopup className='min-w-44'>
            <SelectList>
              <SelectItem value='Arial'>Arial</SelectItem>
              <SelectItem value='Times New Roman'>Times New Roman</SelectItem>
              <SelectItem value='Courier New'>Courier New</SelectItem>
              <SelectItem value='Georgia'>Georgia</SelectItem>
              <SelectItem value='Verdana'>Verdana</SelectItem>
              <SelectItem value='Gill Sans'>Gill Sans</SelectItem>
            </SelectList>
          </SelectPopup>
        </Select>
        <ToolbarSeparator />
        <NumberField defaultValue={14} min={1}>
          <NumberFieldGroup variant='ghost'>
            <NumberFieldDecrement>
              <Icon.MinusIcon weight='bold' />
            </NumberFieldDecrement>
            <ToolbarInput render={<NumberFieldInput className='w-12' />} />
            <NumberFieldIncrement>
              <Icon.PlusIcon weight='bold' />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
        <ToolbarSeparator />
        <ToolbarLink className='text-foreground-neutral-faded px-1 text-nowrap'>
          Saved 5 min ago
        </ToolbarLink>
        <ToolbarSeparator className='mr-3' />
        <Button color='primary' variant='solid' size='xs'>
          Save
        </Button>
      </Toolbar>
    </div>
  )
}
