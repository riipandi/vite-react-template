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
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Autocomplete>

type Story = StoryObj<typeof meta>

const tags = ['feature', 'fix', 'bug', 'docs', 'internal', 'mobile', 'performance', 'refactor']

const countries = ['Canada', 'France', 'Germany', 'Italy', 'Japan', 'Norway', 'Spain', 'Turkey']

export default meta

export const Playground: Story = {
  args: { items: tags },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInput placeholder='Search tags…' />
      <AutocompleteContent>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
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
      <AutocompleteInput placeholder='Search countries…' />
      <AutocompleteContent>
        <AutocompleteEmpty>No countries found.</AutocompleteEmpty>
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
