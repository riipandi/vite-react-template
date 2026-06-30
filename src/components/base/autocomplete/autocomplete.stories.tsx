import type { Meta, StoryObj } from '@storybook/react-vite'
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
      <div className='flex w-full min-w-md items-center justify-center'>
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
        <AutocompleteInput placeholder='Search for books...' className='w-full lg:w-72' />
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
          className='w-full lg:w-72'
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
          className='w-full lg:w-72'
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
