import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue
} from './combobox.component'

const meta = {
  title: 'Base Components/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoHighlight: { control: 'boolean' }
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
} satisfies Meta<typeof Combobox>

type Story = StoryObj<typeof meta>

const frameworks = ['Hogwarts', 'Beauxbatons', 'Durmstrang', 'Ilvermorny', 'Uagadou']

const fruits = ['Butterbeer', 'Pumpkin Juice', 'Firewhisky', 'Gillywater', 'Dandelion Wine']

const produce = [
  { label: 'Louvre', items: ['Mona Lisa', 'Venus de Milo', 'Vitruvian Man'] },
  { label: 'Vatican', items: ['Sistine Chapel', "St. Peter's Basilica", 'Papal Archives'] }
]

interface Framework {
  label: string
  value: string
  description: string
}

const typedFrameworks: Framework[] = [
  { label: 'Robert Langdon', value: 'langdon', description: 'Harvard professor of symbology' },
  { label: 'Sophie Neveu', value: 'neveu', description: 'Cryptographer with the Paris police' },
  { label: 'Vittoria Vetra', value: 'vetra', description: 'Physicist working at CERN' }
]

const styles = stylex.create({
  input: {
    paddingBlock: 4,
    paddingInline: 4,
    width: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 14
  },
  description: {
    color: colors.foregroundNeutralFaded,
    fontSize: 12
  }
})

export default meta

export const Playground: Story = {
  args: { items: frameworks },
  render: (args) => (
    <Combobox {...args}>
      <ComboboxInput placeholder='Search school…' />
      <ComboboxContent>
        <ComboboxEmpty>No school found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)
    const input = canvas.getByPlaceholderText('Search school…')

    // Typing opens the popup with filtered options.
    await userEvent.type(input, 'hog')
    const options = await body.findAllByRole('option')
    const target = options[0]
    if (!target) throw new Error('No filtered options found')
    expect(options.length).toBe(1)
    expect(target).toHaveTextContent('Hogwarts')

    // Selecting fills the input and closes the popup.
    await userEvent.click(target)
    await waitFor(() => expect(input).toHaveValue('Hogwarts'))
  }
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['Hogwarts'])
    const anchorRef = React.useRef<HTMLDivElement>(null)

    return (
      <Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
        <ComboboxChips ref={anchorRef}>
          <ComboboxValue>
            {(items: string[]) =>
              items.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)
            }
          </ComboboxValue>
          <ComboboxChipsInput placeholder='Add school…' />
        </ComboboxChips>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No school found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }
}

export const Popup: Story = {
  render: () => (
    <Combobox items={fruits}>
      <ComboboxTrigger>
        <ComboboxValue placeholder='Select a drink' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder='Search drink…' style={styles.input} />
        <ComboboxEmpty>No drink found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export const Clear: Story = {
  render: () => (
    <Combobox items={frameworks} defaultValue='Hogwarts'>
      <ComboboxInput showClear placeholder='Search school…' />
      <ComboboxContent>
        <ComboboxEmpty>No school found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Search school…')
    expect(input).toHaveValue('Hogwarts')

    await userEvent.click(canvas.getByRole('button', { name: 'Clear value' }))
    await waitFor(() => expect(input).toHaveValue(''))
  }
}

export const Groups: Story = {
  render: () => (
    <Combobox items={produce}>
      <ComboboxInput placeholder='Search landmark…' />
      <ComboboxContent>
        <ComboboxEmpty>No landmark found.</ComboboxEmpty>
        <ComboboxList>
          {produce.map((group, index) => (
            <React.Fragment key={group.label}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.label}</ComboboxLabel>
                <ComboboxCollection>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            </React.Fragment>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export const CustomItems: Story = {
  name: 'Custom items',
  render: () => (
    <Combobox items={typedFrameworks} itemToStringValue={(framework: Framework) => framework.label}>
      <ComboboxInput placeholder='Search person…' />
      <ComboboxContent>
        <ComboboxEmpty>No person found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              <div {...stylex.props(styles.row)}>
                <span {...stylex.props(styles.title)}>{framework.label}</span>
                <span {...stylex.props(styles.description)}>{framework.description}</span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export const Disabled: Story = {
  render: () => (
    <Combobox items={frameworks} disabled>
      <ComboboxInput placeholder='Search school…' />
      <ComboboxContent>
        <ComboboxEmpty>No school found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Search school…')
    expect(input).toBeDisabled()
    await userEvent.click(input)
    expect(within(document.body).queryByRole('option')).toBeNull()
  }
}

export const AutoHighlight: Story = {
  name: 'Auto highlight',
  render: () => (
    <Combobox items={frameworks} autoHighlight>
      <ComboboxInput placeholder='Search school…' />
      <ComboboxContent>
        <ComboboxEmpty>No school found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
