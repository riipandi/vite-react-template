import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { colorVar } from '#/styles/tokens.stylex'
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator
} from '.'
import { Button } from '../button'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput
} from '../number-field'
import { Select, SelectItem, SelectList, SelectPopup, SelectTrigger, SelectValue } from '../select'
import { Toggle } from '../toggle'
import { ToggleGroup } from '../toggle-group'

const meta = {
  title: 'Base Components/Toolbar',
  component: Toolbar,
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
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.paddingRight['20rem'])}>
      <Toolbar>
        <ToolbarGroup aria-label='Indentation'>
          <ToolbarButton render={<Button color='neutral' variant='ghost' size='md' />} disabled>
            <Lucide.Indent />
          </ToolbarButton>
          <ToolbarButton render={<Button color='neutral' variant='ghost' size='md' />}>
            <Lucide.Outdent />
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
            <Lucide.Bold />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle variant='ghost' size='md' />}
            aria-label='Italic'
            value='italic'
          >
            <Lucide.Italic />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle variant='ghost' size='md' />}
            aria-label='Underline'
            value='underline'
          >
            <Lucide.Underline />
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
            <Lucide.AlignLeft />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle />}
            aria-label='Align center'
            value='align-center'
          >
            <Lucide.AlignCenter />
          </ToolbarButton>
          <ToolbarButton
            data-slot='toggle'
            render={<Toggle />}
            aria-label='Align right'
            value='align-right'
          >
            <Lucide.AlignRight />
          </ToolbarButton>
        </ToggleGroup>
        <ToolbarSeparator />
        <Select defaultValue='Arial'>
          <SelectTrigger variant='ghost' {...stylex.props(x.width['6rem'])}>
            <SelectValue
              placeholder='Font'
              {...stylex.props(x.maxWidth['6rem'], x.overflow.hidden)}
            />
          </SelectTrigger>
          <SelectPopup {...stylex.props(x.minWidth['11rem'])}>
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
              <Lucide.Minus />
            </NumberFieldDecrement>
            <ToolbarInput render={<NumberFieldInput {...stylex.props(x.width['3rem'])} />} />
            <NumberFieldIncrement>
              <Lucide.Plus />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
        <ToolbarSeparator />
        <ToolbarLink
          {...stylex.props(x.color[colorVar.fgNeutralFaded], x.whiteSpace.nowrap)}
          {...stylex.props(x.paddingLeft['0.25rem'], x.paddingRight['0.25rem'])}
        >
          Saved 5 min ago
        </ToolbarLink>
        <ToolbarSeparator {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])} />
        <Button color='primary' variant='solid' size='xs'>
          Save
        </Button>
      </Toolbar>
    </div>
  )
}
