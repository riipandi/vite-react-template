import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { colorVar, fontSizeVar } from '#/styles/tokens.stylex'
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from '.'
import { Text } from '../../extra/typography'

const meta = {
  title: 'Base Components/PreviewCard',
  component: PreviewCard,
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
} satisfies Meta<typeof PreviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <PreviewCard>
      <Text {...stylex.props(x.width['66.666667%'])} {...stylex.props(x.width['100%'])}>
        The Philosopher's Stone is a legendary{' '}
        <PreviewCardTrigger
          {...stylex.props(x.color[colorVar.fgPrimary], x.borderColor[colorVar.borderPrimary])}
          {...stylex.props(x.borderBottomWidth['1px'])}
          {...stylex.props(x.cursor.help)}
        >
          alchemical substance
        </PreviewCardTrigger>{' '}
        capable of turning base metals into gold and granting immortality.
      </Text>
      <PreviewCardPopup {...stylex.props(x.maxWidth['18rem'])}>
        <img
          src='https://images.unsplash.com/photo-1618944913480-b67ee16d7b77?q=80&w=2670&auto=format&fit=crop'
          {...stylex.props(x.height.auto, x.borderRadius['0.125rem'])}
          {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'], x.width['100%'])}
          alt='Preview'
        />
        <Text
          {...stylex.props(x.fontSize[fontSizeVar.sm], x.lineHeight.relaxed)}
          {...stylex.props(x.textAlign.justify)}
        >
          In Harry Potter and the Philosopher's Stone, this legendary stone is guarded by Dumbledore
          at Hogwarts. It was created by Nicolas Flampel and is the only known stone to exist. The
          stone plays a crucial role in the first book's plot.
        </Text>
      </PreviewCardPopup>
    </PreviewCard>
  )
}
