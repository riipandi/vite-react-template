import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Accordion, AccordionHeader, AccordionItem } from './accordion.component'
import { AccordionPanel, AccordionTrigger } from './accordion.component'

const styles = stylex.create({
  base: { width: '384px', maxWidth: 'calc(100vw - 4rem)' }
})

const meta = {
  title: 'Base Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.center,
          x.width['100%'],
          x.minWidth['448px']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    value: 'a',
    title: `What is the Philosopher's Stone?`,
    content: `The Philosopher's Stone is a legendary alchemical substance capable of turning base metals into gold and granting immortality.`
  },
  {
    value: 'b',
    title: 'Who is Robert Langdon?',
    content: 'Robert Langdon is a professor of Religious Symbology at Harvard University.'
  },
  {
    value: 'c',
    title: 'What are the Unforgivable Curses?',
    content:
      'The Unforgivable Curses are three dark charms that cause torture, mind control, and death.'
  }
]

export const Playground: Story = {
  render: (args) => (
    <Accordion {...args} xstyle={styles.base}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>{item.title}</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultValue={['a']} xstyle={styles.base}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>{item.title}</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Multiple: Story = {
  render: () => (
    <Accordion multiple xstyle={styles.base}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>{item.title}</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Disabled: Story = {
  render: () => (
    <Accordion xstyle={styles.base}>
      {items.map((item, index) => (
        <AccordionItem key={item.value} value={item.value} disabled={index === 1}>
          <AccordionHeader>
            <AccordionTrigger>{item.title}</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
