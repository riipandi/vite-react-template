import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxEmpty,
  ComboboxValue,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  useComboboxAnchor
} from '#/components/base/combobox'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3],
    width: '22rem'
  },
  comboboxGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[6],
    width: '30rem',
    maxWidth: '100%'
  }
})

const fruits = [
  'Apple',
  'Banana',
  'Blueberry',
  'Cherry',
  'Grape',
  'Kiwi',
  'Mango',
  'Orange',
  'Peach',
  'Pear',
  'Pineapple',
  'Strawberry',
  'Watermelon'
]

function ComboboxDemo({
  showClear = true,
  showTrigger = true,
  label = 'Choose a fruit'
}: {
  showClear?: boolean
  showTrigger?: boolean
  label?: string
}) {
  const anchorRef = useComboboxAnchor()
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <div ref={anchorRef}>
      <span>{label}</span>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxValue />
        <ComboboxInput showClear={showClear} showTrigger={showTrigger} />
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No results found</ComboboxEmpty>
          <ComboboxList>
            {fruits.map((fruit) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <ComboboxDemo label='Playground combobox' />
    </div>
  )
}

export const Default: Story = {
  name: 'With sections',
  parameters: { controls: { disable: true } },
  render: () => {
    const anchorRef = useComboboxAnchor()
    const [value, setValue] = React.useState<string | null>(null)

    const groupedFruits = {
      Tropical: ['Mango', 'Pineapple', 'Kiwi', 'Banana'],
      Berries: ['Strawberry', 'Blueberry', 'Cherry'],
      Citrus: ['Orange', 'Grape'],
      Pomes: ['Apple', 'Pear', 'Peach', 'Watermelon']
    }

    return (
      <div {...stylex.props(layoutStyles.comboboxGrid)}>
        <div ref={anchorRef}>
          <span>Fruit (grouped)</span>
          <Combobox value={value} onValueChange={setValue}>
            <ComboboxValue />
            <ComboboxInput showClear showTrigger />
            <ComboboxContent anchor={anchorRef}>
              <ComboboxEmpty>No results found</ComboboxEmpty>
              <ComboboxList>
                {Object.entries(groupedFruits).map(([group, items]) => (
                  <React.Fragment key={group}>
                    <ComboboxGroup>
                      <ComboboxLabel>{group}</ComboboxLabel>
                      {items.map((fruit) => (
                        <ComboboxItem key={fruit} value={fruit}>
                          {fruit}
                        </ComboboxItem>
                      ))}
                    </ComboboxGroup>
                    <ComboboxSeparator />
                  </React.Fragment>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    )
  }
}
