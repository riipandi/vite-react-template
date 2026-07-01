import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fontSizeVar, radiusVar, colorVar } from '#/styles/tokens.stylex'
import { Text } from '../../extra/typography'
import { Button } from '../button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from './collapsible.component'

const meta = {
  title: 'Base Components/Collapsible',
  component: Collapsible,
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
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(
        x.display.flex,
        x.height['40rem'],
        x.width['100%'],
        x.alignItems.center,
        x.justifyContent.center
      )}
    >
      <Collapsible {...stylex.props(x.width['100%'])}>
        <CollapsibleTrigger>What is the Illuminati?</CollapsibleTrigger>
        <CollapsiblePanel>
          <Text {...stylex.props(x.color[colorVar.fgNeutralFaded])}>
            The Illuminati was a secret society formed in Bavaria in 1776, allegedly seeking to
            oppose religious influence and abuses of state power.
          </Text>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}

export const Indicator: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(
        x.display.flex,
        x.height['40rem'],
        x.width['100%'],
        x.alignItems.center,
        x.justifyContent.center
      )}
    >
      <Collapsible {...stylex.props(x.width['100%'])}>
        <CollapsibleTrigger expandableIndicator>What is the Illuminati?</CollapsibleTrigger>
        <CollapsiblePanel>
          <Text {...stylex.props(x.color[colorVar.fgNeutralFaded])}>
            The Illuminati was a secret society formed in Bavaria in 1776, allegedly seeking to
            oppose religious influence and abuses of state power.
          </Text>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}

export const InfoCard: Story = {
  args: {},
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
      <div
        {...stylex.props(x.borderColor[colorVar.borderNeutral])}
        {...stylex.props(x.width['500px'], x.borderWidth['1px'])}
        {...stylex.props(x.borderRadius[radiusVar.lg], x.padding['1rem'])}
      >
        <Text {...stylex.props(x.fontSize[fontSizeVar.sm])}>
          ReUI is a open-source collection of UI components and animated effects built with React,
          Typescript, Tailwind CSS, and Motion.
        </Text>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsiblePanel {...stylex.props(x.fontSize[fontSizeVar.sm])}>
            Pairs beautifully with shadcn/ui. Save time and build your next project faster.
          </CollapsiblePanel>
          <CollapsibleTrigger
            {...stylex.props(x.textAlign.end)}
            {...stylex.props(
              x.marginLeft['0.5rem'],
              x.marginRight['0.5rem'],
              x.width.fitContent,
              x.justifyContent.flexEnd,
              x.paddingTop['0px'],
              x.paddingBottom['0px'],
              x.fontSize[fontSizeVar.xs]
            )}
            render={<Button size='xs' color='neutral' variant='outline' />}
          >
            {isOpen ? 'Show less' : 'Show more'}
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    )
  }
}
