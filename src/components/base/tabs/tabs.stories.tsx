import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Field, FieldLabel } from '#/components/base/field'
import { Fieldset, FieldsetLegend } from '#/components/base/fieldset'
import { Input } from '#/components/base/input'
import { Tabs, TabsItem, TabsList, TabsPanel } from '#/components/base/tabs'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Tabs',
  component: Tabs,
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
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Tabs defaultValue='account' className='min-w-sm lg:w-6/12' {...stylex.props(x.width['100%'])}>
      <TabsList>
        <TabsItem value='account'>Account</TabsItem>
        <TabsItem value='password'>Password</TabsItem>
      </TabsList>

      <TabsPanel value='account'>
        <Fieldset>
          <FieldsetLegend hidden>Account</FieldsetLegend>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input id='name' placeholder='Enter your name' required />
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input id='email' placeholder='Enter your email' required />
          </Field>
        </Fieldset>
      </TabsPanel>

      <TabsPanel value='password'>
        <Fieldset>
          <FieldsetLegend hidden>Password</FieldsetLegend>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input id='password' type='password' placeholder='Enter your password' required />
          </Field>
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              id='confirm-password'
              type='password'
              placeholder='Enter your confirm password'
              required
            />
          </Field>
        </Fieldset>
      </TabsPanel>
    </Tabs>
  )
}

export const Vertical: Story = {
  args: {},
  render: () => {
    const tabs = [
      {
        name: 'Explore',
        value: 'explore',
        content: 'Discover fresh ideas, trending topics, and hidden gems curated just for you.'
      },
      {
        name: 'Favorites',
        value: 'favorites',
        content: 'All your favorites are saved here for quick access anytime.'
      },
      {
        name: 'Settings',
        value: 'settings',
        content: 'Customize your experience with personal preferences and configurations.'
      }
    ]

    return (
      <Tabs defaultValue='explore' orientation='vertical' {...stylex.props(x.width['100%'])}>
        <TabsList {...stylex.props(x.minWidth['12rem'])}>
          {tabs.map((tab) => (
            <TabsItem key={tab.value} value={tab.value}>
              {tab.name}
            </TabsItem>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsPanel key={tab.value} value={tab.value}>
            <Text>{tab.content}</Text>
          </TabsPanel>
        ))}
      </Tabs>
    )
  }
}

// // FIXME: indicator styles (https://shadcnstudio.com/docs/components/tabs)
// export const BottomLine: Story = {
// args: {},
// render: () => {
// const tabs = [
// {
// name: 'Explore',
// value: 'explore',
// content: (
// <>
// Discover <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>fresh ideas</span>, trending
// topics, and hidden gems curated just for you. Start exploring and let your curiosity
// lead the way!
// </>
// )
// },
// {
// name: 'Favorites',
// value: 'favorites',
// content: (
// <>
// All your <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>favorites</span> are saved
// here. Revisit articles, collections, and moments you love, any time you want a little
// inspiration.
// </>
// )
// },
// {
// name: 'Surprise Me',
// value: 'surprise',
// content: (
// <>
// <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>Surprise!</span> Here&apos;s something
// unexpected—a fun fact, a quirky tip, or a daily challenge. Come back for a new surprise
// every day!
// </>
// )
// }
// ]

// return (
// <div {...stylex.props(x.width["100%"])}>
// <Tabs defaultValue='explore' {...stylex.props(x.gap["1rem"])}>
// <TabsList className='bg-background-neutral' {...stylex.props(x.borderRadius['0px'], x.borderBottomWidth['1px'])} {...stylex.props(x.padding["0px"])}>
// {tabs.map((tab) => (
// <TabsItem
// key={tab.value}
// value={tab.value}
// className={clx(
// 'bg-background-neutral h-full rounded-none border-0 border-b-2 border-transparent',
// 'data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:shadow-none'
// )}
// >
// {tab.name}
// </TabsItem>
// ))}
// </TabsList>

// {tabs.map((tab) => (
// <TabsPanel key={tab.value} value={tab.value}>
// <Text>{tab.content}</Text>
// </TabsPanel>
// ))}
// </Tabs>
// </div>
// )
// }
// }

// // FIXME: indicator styles (https://shadcnstudio.com/docs/components/tabs)
// export const LiftStyle: Story = {
// args: {},
// render: () => {
// const tabs = [
// {
// name: 'Explore',
// value: 'explore',
// content: (
// <>
// Discover <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>fresh ideas</span>, trending
// topics, and hidden gems curated just for you. Start exploring and let your curiosity
// lead the way!
// </>
// )
// },
// {
// name: 'Favorites',
// value: 'favorites',
// content: (
// <>
// All your <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>favorites</span> are saved
// here. Revisit articles, collections, and moments you love, any time you want a little
// inspiration.
// </>
// )
// },
// {
// name: 'Surprise Me',
// value: 'surprise',
// content: (
// <>
// <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>Surprise!</span> Here&apos;s something
// unexpected—a fun fact, a quirky tip, or a daily challenge. Come back for a new surprise
// every day!
// </>
// )
// }
// ]
// return (
// <div {...stylex.props(x.width["100%"])}>
// <Tabs defaultValue='explore' {...stylex.props(x.gap["1rem"])}>
// <TabsList className='bg-background-neutral' {...stylex.props(x.borderRadius['0px'], x.borderBottomWidth['1px'])} {...stylex.props(x.justifyContent.flexStart, x.padding["0px"])}>
// {tabs.map((tab) => (
// <TabsItem
// key={tab.value}
// value={tab.value}
// className='bg-background-neutral border-b-border dark:data-[state=active]:bg-background-neutral data-[state=active]:border-border-neutral data-[state=active]:border-b-background rounded-t border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5' {...stylex.props(x.borderRadius['0px'], x.borderWidth['1px'])} {...stylex.props(x.height["100%"])}
// >
// {tab.name}
// </TabsItem>
// ))}
// </TabsList>

// {tabs.map((tab) => (
// <TabsPanel key={tab.value} value={tab.value}>
// <Text>{tab.content}</Text>
// </TabsPanel>
// ))}
// </Tabs>
// </div>
// )
// }
// }

// // FIXME: indicator styles (https://shadcnstudio.com/docs/components/tabs)
// export const VerticalLine: Story = {
// args: {},
// render: () => {
// const tabs = [
// {
// name: 'Explore',
// value: 'explore',
// content: (
// <>
// Discover <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>fresh ideas</span>, trending
// topics, and hidden gems curated just for you. Start exploring and let your curiosity
// lead the way!
// </>
// )
// },
// {
// name: 'Favorites',
// value: 'favorites',
// content: (
// <>
// All your <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>favorites</span> are saved
// here. Revisit articles, collections, and moments you love, any time you want a little
// inspiration.
// </>
// )
// },
// {
// name: 'Surprise Me',
// value: 'surprise',
// content: (
// <>
// <span {...stylex.props(x.color[color.fgNeutral])} {...stylex.props(x.fontWeight[fontWeight.semibold])}>Surprise!</span> Here&apos;s something
// unexpected—a fun fact, a quirky tip, or a daily challenge. Come back for a new surprise
// every day!
// </>
// )
// }
// ]

// return (
// <div {...stylex.props(x.width["100%"])}>
// <Tabs defaultValue='explore' {...stylex.props(x.flexDirection.row)}>
// <TabsList className='bg-background-neutral' {...stylex.props(x.borderRadius['0px'])} {...stylex.props(x.height["100%"], x.flexDirection.column, x.padding["0px"])}>
// {tabs.map((tab) => (
// <TabsItem
// key={tab.value}
// value={tab.value}
// className='bg-background-neutral data-[state=active]:border-primary dark:data-[state=active]:border-primary border-transparent data-[state=active]:shadow-none' {...stylex.props(x.borderRadius['0px'], x.borderWidth['0px'], x.borderLeftWidth['2px'])} {...stylex.props(x.height["100%"], x.width["100%"], x.justifyContent.flexStart)}
// >
// {tab.name}
// </TabsItem>
// ))}
// </TabsList>

// {tabs.map((tab) => (
// <TabsPanel key={tab.value} value={tab.value}>
// <Text>{tab.content}</Text>
// </TabsPanel>
// ))}
// </Tabs>
// </div>
// )
// }
// }
