import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { ChevronDownIcon } from 'lucide-react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '#/components/base/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '#/components/base/dropdown-menu'
import { Input } from '#/components/base/input'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group.component'

const meta = {
  title: 'Extra Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ButtonGroup>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { width: 16, height: 16 },
  fusedTrigger: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant='outline'>Expelliarmus</Button>
      <Button variant='outline'>Petrificus Totalus</Button>
      <Button variant='outline'>Stupefy</Button>
    </ButtonGroup>
  )
}

export const Orientation: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant='outline'>Accio</Button>
      <Button variant='outline'>Alohomora</Button>
      <Button variant='outline'>Lumos</Button>
    </ButtonGroup>
  )
}

export const Split: Story = {
  name: 'Split button',
  render: () => (
    // The trigger's `render` swaps it for a Button — ButtonGroup then fuses both
    // the primary action and the trigger into one segmented control.
    <ButtonGroup>
      <Button>Apparate</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size='icon' aria-label='More apparition options' style={styles.fusedTrigger} />
          }
        >
          <ChevronDownIcon {...stylex.props(styles.icon)} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>Apparate to Hogsmeade</DropdownMenuItem>
          <DropdownMenuItem>Return to Hogwarts</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'More apparition options' }))
    await body.findByRole('menu')
    await userEvent.click(body.getByRole('menuitem', { name: 'Apparate to Hogsmeade' }))
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull())
  }
}

export const Text: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>House</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant='outline'>Gryffindor</Button>
      <Button variant='outline'>Slytherin</Button>
      <Button variant='outline'>All</Button>
    </ButtonGroup>
  )
}

export const WithInput: Story = {
  name: 'Input',
  render: () => (
    <ButtonGroup>
      <Input type='email' placeholder='Owl address' />
      <Button variant='outline'>Join the Order</Button>
    </ButtonGroup>
  )
}
