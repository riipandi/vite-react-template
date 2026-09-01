import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { colorVar, fontSizeVar, fontWeightVar } from '#/styles/core/tokens.stylex'
// import { IconBox } from '../extra/icon-box/icon-box.component'
import { FacebookIcon, GitHubIcon, GoogleIcon, InstagramIcon } from './index'
import { LinkedInIcon, TelegramIcon, WhatsAppIcon, XIcon } from './index'

const icons = [
  { name: 'GitHub', component: GitHubIcon },
  { name: 'Google', component: GoogleIcon },
  { name: 'Facebook', component: FacebookIcon },
  { name: 'X (Twitter)', component: XIcon },
  { name: 'Instagram', component: InstagramIcon },
  { name: 'LinkedIn', component: LinkedInIcon },
  { name: 'Telegram', component: TelegramIcon },
  { name: 'WhatsApp', component: WhatsAppIcon }
] as const

const meta = {
  title: 'Extra Components/Icons',
  parameters: { layout: 'centered' },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.center,
          x.minWidth['448px']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta

export default meta
type Story = StoryObj

function PlaygroundComponent({ size = 24, color }: { size?: number; color?: string }) {
  return (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['1rem'])}>
      <IconBox>
        <GitHubIcon size={size} color={color} />
      </IconBox>
      <IconBox>
        <XIcon size={size} color={color} />
      </IconBox>
      <IconBox variant='info'>
        <GoogleIcon size={size} />
      </IconBox>
      <IconBox variant='success'>
        <WhatsAppIcon size={size} />
      </IconBox>
    </div>
  )
}

export const Playground: Story = {
  argTypes: {
    size: { control: { type: 'range', min: 12, max: 64, step: 4 } },
    color: { control: 'color' }
  },
  args: { size: 24, color: undefined },
  render: (args) => <PlaygroundComponent {...args} />
}

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      {...stylex.props(
        x.display.flex,
        x.flexWrap.wrap,
        x.justifyContent.center,
        x.alignItems.center,
        x.gap['1.5rem']
      )}
    >
      {icons.map(({ name, component: Icon }) => (
        <div
          key={name}
          {...stylex.props(
            x.display.flex,
            x.flexDirection.column,
            x.alignItems.center,
            x.gap['0.5rem']
          )}
        >
          <IconBox>
            <Icon size={20} />
          </IconBox>
          <span {...stylex.props(x.fontSize[fontSizeVar.xs], x.color[colorVar.fgNeutralFaded])}>
            {name}
          </span>
        </div>
      ))}
    </div>
  )
}

const sizeSteps = [16, 20, 24, 32, 48] as const

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      {...stylex.props(
        x.display.flex,
        x.flexDirection.column,
        x.gap['1.5rem'],
        x.minWidth['320px']
      )}
    >
      {icons.slice(0, 4).map(({ name, component: Icon }) => (
        <div key={name} {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
          <span
            {...stylex.props(
              x.minWidth['4rem'],
              x.fontSize[fontSizeVar.xs],
              x.fontWeight[fontWeightVar.semibold],
              x.color[colorVar.fgNeutralFaded]
            )}
          >
            {name}
          </span>
          <Lucide.Minus />
          {sizeSteps.map((s) => (
            <Icon key={s} size={s} />
          ))}
          <Lucide.Plus />
        </div>
      ))}
    </div>
  )
}

export const Raw: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      {...stylex.props(
        x.display.flex,
        x.flexWrap.wrap,
        x.alignItems.center,
        x.justifyContent.center,
        x.gap['1rem']
      )}
    >
      {icons.map(({ name, component: Icon }) => (
        <Icon key={name} size={32} />
      ))}
    </div>
  )
}

export const InContext: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <GitHubIcon size={16} color={colorVar.fgNeutralFaded} />
      <GoogleIcon size={16} color={colorVar.fgNeutralFaded} />
      <FacebookIcon size={16} color={colorVar.fgNeutralFaded} />
      <XIcon size={16} color={colorVar.fgNeutralFaded} />
      <InstagramIcon size={16} color={colorVar.fgNeutralFaded} />
      <LinkedInIcon size={16} color={colorVar.fgNeutralFaded} />
      <TelegramIcon size={16} color={colorVar.fgNeutralFaded} />
      <WhatsAppIcon size={16} color={colorVar.fgNeutralFaded} />
    </div>
  )
}
