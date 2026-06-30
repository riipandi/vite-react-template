import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Autocomplete,
  AutocompletePopup,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteCollection
} from './autocomplete.component'

const meta = {
  title: 'Base Components/Autocomplete',
  component: Autocomplete,
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
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    group: 'Dan Brown Novels',
    items: [
      { value: 'da-vinci-code', label: 'The Da Vinci Code' },
      { value: 'angels-demons', label: 'Angels & Demons' },
      { value: 'inferno', label: 'Inferno' },
      { value: 'lost-symbol', label: 'The Lost Symbol' },
      { value: 'digital-fortress', label: 'Digital Fortress' },
      { value: 'deception-point', label: 'Deception Point' },
      { value: 'origin', label: 'Origin' },
      { value: 'wild-symphony', label: 'Wild Symphony' }
    ]
  },
  {
    group: 'Harry Potter Books',
    items: [
      { value: 'sorcerers-stone', label: "Harry Potter and the Sorcerer's Stone" },
      { value: 'chamber-secrets', label: 'Harry Potter and the Chamber of Secrets' },
      { value: 'prisoner-azkaban', label: 'Harry Potter and the Prisoner of Azkaban' }
    ]
  }
]

export const Playground: Story = {
  args: {},
  render: () => {
    return (
      <Autocomplete items={items}>
        <AutocompleteInput
          placeholder='Search for books...'
          className='lg:w-72'
          {...stylex.props(x.width['100%'])}
        />
        <AutocompletePopup>
          <AutocompleteEmpty>No results found</AutocompleteEmpty>
          <AutocompleteList>
            {(group) => (
              <AutocompleteGroup key={group.group} items={group.items}>
                <AutocompleteGroupLabel>{group.group}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    )
  }
}

export const VariantSubtle: Story = {
  args: {},
  render: () => {
    return (
      <Autocomplete items={items}>
        <AutocompleteInput
          placeholder='Search for books...'
          className='lg:w-72'
          {...stylex.props(x.width['100%'])}
          variant='subtle'
        />
        <AutocompletePopup>
          <AutocompleteEmpty>No results found</AutocompleteEmpty>
          <AutocompleteList>
            {(group) => (
              <AutocompleteGroup key={group.group} items={group.items}>
                <AutocompleteGroupLabel>{group.group}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    )
  }
}

export const VariantGhost: Story = {
  args: {},
  render: () => {
    return (
      <Autocomplete items={items}>
        <AutocompleteInput
          placeholder='Search for books...'
          className='lg:w-72'
          {...stylex.props(x.width['100%'])}
          variant='ghost'
        />
        <AutocompletePopup>
          <AutocompleteEmpty>No results found</AutocompleteEmpty>
          <AutocompleteList>
            {(group) => (
              <AutocompleteGroup key={group.group} items={group.items}>
                <AutocompleteGroupLabel>{group.group}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    )
  }
}
