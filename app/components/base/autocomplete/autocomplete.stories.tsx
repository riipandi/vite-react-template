import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Autocomplete,
  AutocompleteContent,
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
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Autocomplete>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { items: ['React', 'Vue', 'Svelte', 'Solid', 'Angular'] },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInput placeholder='Search a framework…' />
      <AutocompleteContent>
        <AutocompleteList>
          {(item) => (
            <AutocompleteItem key={item} value={item}>
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}
