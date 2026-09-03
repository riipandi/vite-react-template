import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { CheckboxGroup } from './checkbox-group.component'
import { Checkbox } from './checkbox.component'

export default {
  title: 'Base Components/Checkbox Group',
  component: CheckboxGroup,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CheckboxGroup>

function checkboxInputs(container: HTMLElement): HTMLInputElement[] {
  return Array.from(container.querySelectorAll('input[type="checkbox"]'))
}

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

interface PlaygroundArgs {
  defaultValue: string[]
  hasError: boolean
  disabled: boolean
  handleChange: ReturnType<typeof fn>
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    defaultValue: ['a', 'b'],
    hasError: false,
    disabled: false,
    handleChange: fn()
  },
  argTypes: {
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  render: (args) => {
    const { handleChange, ...props } = args
    return (
      <CheckboxGroup {...props} onValueChange={handleChange}>
        <Checkbox value='a'>Option A</Checkbox>
        <Checkbox value='b'>Option B</Checkbox>
        <Checkbox value='c'>Option C</Checkbox>
      </CheckboxGroup>
    )
  }
}

// ---------------------------------------------------------------------------
// value, controlled
// ---------------------------------------------------------------------------

export const Value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'value, controlled',
  args: { handleChange: fn() },
  render: (args) => (
    <CheckboxGroup value={['1']} onValueChange={args.handleChange}>
      <Checkbox value='1'>Content</Checkbox>
      <Checkbox value='2'>Content 2</Checkbox>
    </CheckboxGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const inputs = checkboxInputs(canvasElement)
    const first = inputs[0]!
    const second = inputs[1]!
    expect(first).toBeChecked()
    await userEvent.click(second)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      ['1', '2'],
      expect.objectContaining({
        reason: 'none',
        event: expect.objectContaining({ target: second })
      })
    )
    // Still checked because it's controlled
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// defaultValue, uncontrolled
// ---------------------------------------------------------------------------

export const DefaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'defaultValue, uncontrolled',
  args: { handleChange: fn() },
  render: (args) => (
    <CheckboxGroup defaultValue={['1']} onValueChange={args.handleChange}>
      <Checkbox value='1'>Content</Checkbox>
      <Checkbox value='2'>Content 2</Checkbox>
    </CheckboxGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const inputs = checkboxInputs(canvasElement)
    const first = inputs[0]!
    const second = inputs[1]!
    expect(first).toBeChecked()
    await userEvent.click(second)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      ['1', '2'],
      expect.objectContaining({
        reason: 'none',
        event: expect.objectContaining({ target: second })
      })
    )
    expect(first).toBeChecked()
    expect(second).toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// disabled
// ---------------------------------------------------------------------------

export const Disabled: StoryObj = {
  name: 'disabled',
  render: () => (
    <Example title='Disabled'>
      <CheckboxGroup disabled defaultValue={['1']}>
        <Checkbox value='1'>Item 1</Checkbox>
        <Checkbox value='2'>Item 2</Checkbox>
      </CheckboxGroup>
    </Example>
  ),
  play: ({ canvasElement }) => {
    const [input] = checkboxInputs(canvasElement)
    expect(input).toBeDisabled()
  }
}

// ---------------------------------------------------------------------------
// select all
// ---------------------------------------------------------------------------

export const SelectAll: StoryObj = {
  name: 'select all',
  render: () => (
    <Example title='Select all'>
      <CheckboxGroup allValues={['a', 'b', 'c']} defaultValue={['a']}>
        <Checkbox parent>Select all</Checkbox>
        <Checkbox value='a'>Option A</Checkbox>
        <Checkbox value='b'>Option B</Checkbox>
        <Checkbox value='c'>Option C</Checkbox>
      </CheckboxGroup>
    </Example>
  ),
  play: async ({ canvasElement }) => {
    const inputs = checkboxInputs(canvasElement)
    const parent = inputs[0]!
    const a = inputs[1]!
    expect(parent.indeterminate).toBeTruthy()
    await userEvent.click(inputs[2]!)
    await userEvent.click(inputs[3]!)
    expect(parent.checked).toBe(true)
    await userEvent.click(parent)
    expect(a.checked).toBe(false)
  }
}

// ---------------------------------------------------------------------------
// hasError
// ---------------------------------------------------------------------------

export const HasError: StoryObj = {
  name: 'hasError',
  render: () => (
    <Example title='Error'>
      <CheckboxGroup hasError>
        <Checkbox value='a'>Option A</Checkbox>
        <Checkbox value='b'>Option B</Checkbox>
      </CheckboxGroup>
    </Example>
  ),
  play: ({ canvas }) => {
    expect(canvas.getAllByRole('checkbox').length).toBe(2)
  }
}
