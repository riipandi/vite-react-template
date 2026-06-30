import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription
} from '#/components/base/popover'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  argTypes: {
    open: { control: 'boolean' }
  },
  tags: [],
  args: { onOpenChange: fn() }
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center',
    minWidth: '16rem'
  }
})

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='popover-playground-wrapper'>
      <Popover>
        <PopoverTrigger id='popover-playground-trigger'>
          <Button id='popover-playground-button'>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent id='popover-playground-content'>
          <PopoverHeader id='popover-playground-header'>
            <PopoverTitle id='popover-playground-title'>Account details</PopoverTitle>
            <PopoverDescription id='popover-playground-description'>
              Manage your account preferences
            </PopoverDescription>
            <PopoverClose id='popover-playground-close' />
          </PopoverHeader>
          <div {...stylex.props(x.padding[space[4]])} id='popover-playground-body'>
            <form onSubmit={(e) => e.preventDefault()}>
              <div {...stylex.props(x.marginBottom[space[3]])}>
                <Input id='popover-input-name' placeholder='Name' />
              </div>
              <div {...stylex.props(x.marginBottom[space[3]])}>
                <Input id='popover-input-email' placeholder='Email' type='email' />
              </div>
              <Button id='popover-save-button' type='submit'>
                Save
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='popover-default-wrapper'>
      <Popover>
        <PopoverTrigger id='popover-default-trigger'>
          <Button id='popover-default-button'>Account info</Button>
        </PopoverTrigger>
        <PopoverContent id='popover-default-content'>
          <PopoverHeader id='popover-default-header'>
            <PopoverTitle id='popover-default-title'>Profile</PopoverTitle>
            <PopoverDescription id='popover-default-description'>
              Your profile information
            </PopoverDescription>
            <PopoverClose id='popover-default-close' />
          </PopoverHeader>
          <div {...stylex.props(x.padding[space[4]])} id='popover-default-body'>
            <p id='popover-default-text'>
              You can edit your profile details from the settings page.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
