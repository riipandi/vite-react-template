import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { PreviewCard, PreviewCardTrigger, PreviewCardContent } from '#/components/base/preview-card'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/PreviewCard',
  component: PreviewCard,
  parameters: { layout: 'centered' },
  argTypes: {
    open: { control: 'boolean' }
  },
  tags: [],
  args: { onOpenChange: fn() }
} satisfies Meta<typeof PreviewCard>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center',
    minWidth: '20rem'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2],
    padding: space[4]
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
})

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='preview-card-playground-wrapper'>
      <PreviewCard>
        <PreviewCardTrigger
          id='preview-card-playground-trigger'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Hover over me
        </PreviewCardTrigger>
        <PreviewCardContent id='preview-card-playground-content' variant='dark'>
          <div {...stylex.props(layoutStyles.cardContent)} id='preview-card-playground-body'>
            <strong id='preview-card-playground-title'>Preview title</strong>
            <span id='preview-card-playground-desc'>
              This is a preview card with additional information about the hovered element.
            </span>
          </div>
        </PreviewCardContent>
      </PreviewCard>
    </div>
  )
}

const variants = ['dark', 'light'] as const

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='preview-card-variant-wrapper'>
      {variants.map((v) => (
        <div key={v} {...stylex.props(x.marginBottom[space[4]])} id={`preview-card-variant-${v}`}>
          <PreviewCard key={v}>
            <PreviewCardTrigger
              id={`preview-card-trigger-${v}`}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              {v} variant
            </PreviewCardTrigger>
            <PreviewCardContent id={`preview-card-content-${v}`} variant={v}>
              <div {...stylex.props(layoutStyles.cardContent)} id={`preview-card-body-${v}`}>
                <strong id={`preview-card-title-${v}`}>{v} preview</strong>
                <span id={`preview-card-desc-${v}`}>Preview card with {v} variant styling.</span>
              </div>
            </PreviewCardContent>
          </PreviewCard>
        </div>
      ))}
    </div>
  )
}
