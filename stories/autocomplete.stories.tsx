import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import {
  Autocomplete,
  AutocompleteInput,
  AutocompletePopup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty
} from '#/components/base/autocomplete'
import { space } from '#/styles/tokens.stylex'

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'lemon', label: 'Lemon' }
]

const vegetables = [
  { value: 'carrot', label: 'Carrot' },
  { value: 'broccoli', label: 'Broccoli' },
  { value: 'spinach', label: 'Spinach' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'potato', label: 'Potato' }
]

const meta = {
  title: 'Component/Autocomplete',
  component: Autocomplete,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
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

const layoutStyles = stylex.create({
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: space[2]
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Autocomplete>
      <div>
        <label {...stylex.props(layoutStyles.label)} htmlFor='autocomplete-input-playground'>
          Choose a fruit
        </label>
        <AutocompleteInput showClear showTrigger />
      </div>
      <AutocompletePopup align='start'>
        <AutocompleteList>
          <AutocompleteEmpty>No results found</AutocompleteEmpty>
          {fruits.map((item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.label}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  )
}

export const States: Story = {
  name: 'With Groups',
  parameters: { controls: { disable: true } },
  render: () => (
    <Autocomplete>
      <div>
        <label {...stylex.props(layoutStyles.label)} htmlFor='autocomplete-input-groups'>
          Choose an item
        </label>
        <AutocompleteInput showClear showTrigger startAddon={<Lucide.Search size={16} />} />
      </div>
      <AutocompletePopup align='start'>
        <AutocompleteList>
          <AutocompleteEmpty>No results found</AutocompleteEmpty>
          <AutocompleteGroup>
            <AutocompleteGroupLabel>Fruits</AutocompleteGroupLabel>
            {fruits.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </AutocompleteGroup>
          <AutocompleteGroup>
            <AutocompleteGroupLabel>Vegetables</AutocompleteGroupLabel>
            {vegetables.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </AutocompleteGroup>
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  )
}
