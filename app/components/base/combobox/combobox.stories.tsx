import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
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
  parameters: { layout: 'fullscreen' },
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoHighlight: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Combobox>

type Story = StoryObj<typeof meta>

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt', 'Remix', 'Astro']

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Peach']

const produce = [
  { label: 'Fruits', items: ['Apple', 'Banana', 'Cherry'] },
  { label: 'Vegetables', items: ['Carrot', 'Potato', 'Spinach'] }
]

interface Framework {
  label: string
  value: string
  description: string
}

const typedFrameworks: Framework[] = [
  { label: 'Next.js', value: 'next', description: 'The React framework for the web' },
  { label: 'SvelteKit', value: 'sveltekit', description: 'Web development, streamlined' },
  { label: 'Nuxt', value: 'nuxt', description: 'The intuitive Vue framework' }
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
      <ComboboxInput placeholder='Search framework…' />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
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

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['Next.js'])
    const anchorRef = React.useRef<HTMLDivElement>(null)

    return (
      <Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
        <ComboboxChips ref={anchorRef}>
          <ComboboxValue>
            {(items: string[]) =>
              items.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)
            }
          </ComboboxValue>
          <ComboboxChipsInput placeholder='Add framework…' />
        </ComboboxChips>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
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
        <ComboboxValue placeholder='Select a fruit' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder='Search fruit…' style={styles.input} />
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
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
    <Combobox items={frameworks} defaultValue='Next.js'>
      <ComboboxInput showClear placeholder='Search framework…' />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
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

export const Groups: Story = {
  render: () => (
    <Combobox items={produce}>
      <ComboboxInput placeholder='Search produce…' />
      <ComboboxContent>
        <ComboboxEmpty>No produce found.</ComboboxEmpty>
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
      <ComboboxInput placeholder='Search framework…' />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
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
      <ComboboxInput placeholder='Search framework…' />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
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

export const AutoHighlight: Story = {
  name: 'Auto highlight',
  render: () => (
    <Combobox items={frameworks} autoHighlight>
      <ComboboxInput placeholder='Search framework…' />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
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
