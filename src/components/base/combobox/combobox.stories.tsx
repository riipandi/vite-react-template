import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Combobox,
  ComboboxPopup,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxInput,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxCollection
} from './combobox.component'

const meta = {
  title: 'Base Components/Combobox',
  component: Combobox,
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
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'da-vinci-code', label: 'The Da Vinci Code' },
  { value: 'angels-demons', label: 'Angels & Demons' },
  { value: 'sorcerers-stone', label: "Harry Potter and the Sorcerer's Stone" },
  { value: 'chamber-secrets', label: 'The Chamber of Secrets' },
  { value: 'inferno', label: 'Inferno' },
  { value: 'prisoner-azkaban', label: 'The Prisoner of Azkaban' },
  { value: 'lost-symbol', label: 'The Lost Symbol' }
]

export const Playground: Story = {
  args: {},
  render: () => {
    return (
      <Combobox items={options} defaultValue={options[0]}>
        <ComboboxTrigger {...stylex.props(x.width['20rem'])}>
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxPopup>
          <ComboboxSearch />
          <ComboboxEmpty>No results found</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    )
  }
}

// FIXME: variant not working
export const VariantShowcase: Story = {
  args: {},
  render: () => {
    return (
      <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
        <Combobox items={options} defaultValue={options[0]}>
          <ComboboxTrigger {...stylex.props(x.width['20rem'])} variant='default'>
            <ComboboxValue />
          </ComboboxTrigger>
          <ComboboxPopup>
            <ComboboxSearch />
            <ComboboxEmpty>No results found</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>

        <Combobox items={options} defaultValue={options[0]}>
          <ComboboxTrigger {...stylex.props(x.width['20rem'])} variant='subtle'>
            <ComboboxValue />
          </ComboboxTrigger>
          <ComboboxPopup>
            <ComboboxSearch />
            <ComboboxEmpty>No results found</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>

        <Combobox items={options} defaultValue={options[0]}>
          <ComboboxTrigger {...stylex.props(x.width['20rem'])} pill>
            <ComboboxValue />
          </ComboboxTrigger>
          <ComboboxPopup>
            <ComboboxSearch />
            <ComboboxEmpty>No results found</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>

        <Combobox items={options} defaultValue={options[0]}>
          <ComboboxTrigger {...stylex.props(x.width['20rem'])} variant='ghost'>
            <ComboboxValue />
          </ComboboxTrigger>
          <ComboboxPopup>
            <ComboboxSearch />
            <ComboboxEmpty>No results found</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </div>
    )
  }
}

export const MultipleSelect: Story = {
  args: {},
  render: () => {
    const anchorRef = React.useRef<HTMLDivElement | null>(null)

    return (
      <div {...stylex.props(x.width['100%'])}>
        <Combobox items={options} multiple>
          <ComboboxInput placeholder='Select books' />
          <ComboboxPopup anchor={anchorRef}>
            <ComboboxEmpty>No results found</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </div>
    )
  }
}

export const GroupedItem: Story = {
  args: {},
  render: () => {
    const items = [
      {
        label: 'Dan Brown Novels',
        items: [
          { label: 'The Da Vinci Code', value: 'da-vinci-code' },
          { label: 'Angels & Demons', value: 'angels-demons' },
          { label: 'Inferno', value: 'inferno' }
        ]
      },
      {
        label: 'Harry Potter Books',
        items: [
          { label: "The Sorcerer's Stone", value: 'sorcerers-stone' },
          { label: 'The Chamber of Secrets', value: 'chamber-secrets' },
          { label: 'The Prisoner of Azkaban', value: 'prisoner-azkaban' }
        ]
      }
    ]

    return (
      <Combobox items={items}>
        <ComboboxTrigger {...stylex.props(x.width['20rem'])}>
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxPopup>
          <ComboboxSearch placeholder='Search books...' />
          <ComboboxEmpty>No results found</ComboboxEmpty>
          <ComboboxList>
            {(group) => (
              <ComboboxGroup items={group.items} key={group.label}>
                <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    )
  }
}
