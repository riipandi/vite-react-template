import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { CopyIcon, SearchIcon } from 'lucide-react'
import { expect, userEvent } from 'storybook/test'
import { Kbd } from '#/components/extra/kbd'
import { Spinner } from '#/components/extra/spinner'
import { container } from '#/styles/core/tokens.stylex'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from './input-group.component'

const meta = {
  title: 'Extra Components/InputGroup',
  component: InputGroup,
  parameters: { layout: 'centered' },
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
} satisfies Meta<typeof InputGroup>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { height: 14, width: 14 },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: container.sm
  },
  group: {
    maxWidth: container.sm
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder='dailyprophet.co.uk' />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder='Search spells…' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton>Accio</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export const Icon: Story = {
  render: () => (
    <InputGroup style={styles.group}>
      <InputGroupAddon>
        <SearchIcon {...stylex.props(styles.icon)} />
      </InputGroupAddon>
      <InputGroupInput placeholder='Search the Restricted Section…' />
    </InputGroup>
  )
}

export const Button: Story = {
  render: () => (
    <InputGroup style={styles.group}>
      <InputGroupInput readOnly defaultValue='https://dailyprophet.co.uk/howlers' />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton aria-label='Copy howler address'>
          <CopyIcon {...stylex.props(styles.icon)} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export const WithKbd: Story = {
  name: 'Kbd',
  render: () => (
    <InputGroup style={styles.group}>
      <InputGroupInput placeholder='Search the restricted stacks…' />
      <InputGroupAddon align='inline-end'>
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}

export const WithSpinner: Story = {
  name: 'Spinner',
  render: () => (
    <InputGroup style={styles.group}>
      <InputGroupInput placeholder='Enter an auror codename' defaultValue='mad-eye' />
      <InputGroupAddon align='inline-end'>
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  )
}

export const Textarea: Story = {
  render: () => (
    <InputGroup style={styles.group}>
      <InputGroupTextarea placeholder='Write to Sirius…' rows={3} />
      <InputGroupAddon align='block-end'>
        <InputGroupButton variant='outline' size='xs'>
          Send owl
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvas }) => {
    const textarea = canvas.getByPlaceholderText('Write to Sirius…')
    await userEvent.type(textarea, 'Padfoot, the map is a fake.')
    expect(textarea).toHaveValue('Padfoot, the map is a fake.')
  }
}
