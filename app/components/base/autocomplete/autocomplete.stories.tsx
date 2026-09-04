import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from './autocomplete.component'

const meta = {
  title: 'Base Components/Autocomplete',
  component: Autocomplete,
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
} satisfies Meta<typeof Autocomplete>

type Story = StoryObj<typeof meta>

const tags = [
  'Expelliarmus',
  'Expecto Patronum',
  'Lumos',
  'Alohomora',
  'Accio',
  'Wingardium Leviosa',
  'Riddikulus',
  'Obliviate'
]

const countries = [
  'Paris',
  'Rome',
  'Florence',
  'Venice',
  'Geneva',
  'Cambridge',
  'Boston',
  'Seville'
]

export default meta

export const Playground: Story = {
  args: { items: tags },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInput placeholder='Search spells…' />
      <AutocompleteContent>
        <AutocompleteEmpty>No spells found.</AutocompleteEmpty>
        <AutocompleteList>
          {(tag) => (
            <AutocompleteItem key={tag} value={tag}>
              {tag}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}

export const AutoHighlight: Story = {
  args: { items: countries, autoHighlight: true },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInput placeholder='Search cities…' />
      <AutocompleteContent>
        <AutocompleteEmpty>No cities found.</AutocompleteEmpty>
        <AutocompleteList>
          {(country) => (
            <AutocompleteItem key={country} value={country}>
              {country}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}
