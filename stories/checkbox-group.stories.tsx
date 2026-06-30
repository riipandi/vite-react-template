import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { CheckBox } from '#/components/base/checkbox'
import { CheckboxGroup } from '#/components/base/checkbox-group'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/CheckboxGroup',
  component: CheckboxGroup,
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
} satisfies Meta<typeof CheckboxGroup>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3]
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2]
  },
  label: {
    fontSize: '0.875rem',
    userSelect: 'none'
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CheckboxGroup id='checkbox-group-playground'>
      <div {...stylex.props(layoutStyles.group)}>
        {['React', 'Vue', 'Svelte', 'Solid'].map((framework) => (
          <label key={framework.toLowerCase()} {...stylex.props(layoutStyles.item)}>
            <CheckBox
              id={`checkbox-group-playground-${framework.toLowerCase()}`}
              value={framework.toLowerCase()}
            />
            <span {...stylex.props(layoutStyles.label)}>{framework}</span>
          </label>
        ))}
      </div>
    </CheckboxGroup>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <CheckboxGroup id='checkbox-group-default'>
      <div {...stylex.props(layoutStyles.group)}>
        {['Option A', 'Option B', 'Option C'].map((opt) => (
          <label key={opt} {...stylex.props(layoutStyles.item)}>
            <CheckBox
              id={`checkbox-group-default-${opt.toLowerCase().replace(' ', '-')}`}
              value={opt.toLowerCase().replace(' ', '-')}
            />
            <span {...stylex.props(layoutStyles.label)}>{opt}</span>
          </label>
        ))}
      </div>
    </CheckboxGroup>
  )
}
