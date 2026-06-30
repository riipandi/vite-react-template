import type { Meta, StoryObj } from '@storybook/react-vite'
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
      <div className='flex w-full min-w-md items-center justify-center'>
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
    <Tabs defaultValue='account' className='w-full min-w-sm lg:w-6/12'>
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
      <Tabs defaultValue='explore' orientation='vertical' className='w-full max-w-xl'>
        <TabsList className='min-w-48'>
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
//   args: {},
//   render: () => {
//     const tabs = [
//       {
//         name: 'Explore',
//         value: 'explore',
//         content: (
//           <>
//             Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending
//             topics, and hidden gems curated just for you. Start exploring and let your curiosity
//             lead the way!
//           </>
//         )
//       },
//       {
//         name: 'Favorites',
//         value: 'favorites',
//         content: (
//           <>
//             All your <span className='text-foreground font-semibold'>favorites</span> are saved
//             here. Revisit articles, collections, and moments you love, any time you want a little
//             inspiration.
//           </>
//         )
//       },
//       {
//         name: 'Surprise Me',
//         value: 'surprise',
//         content: (
//           <>
//             <span className='text-foreground font-semibold'>Surprise!</span> Here&apos;s something
//             unexpected—a fun fact, a quirky tip, or a daily challenge. Come back for a new surprise
//             every day!
//           </>
//         )
//       }
//     ]

//     return (
//       <div className='w-full max-w-md'>
//         <Tabs defaultValue='explore' className='gap-4'>
//           <TabsList className='bg-background-neutral rounded-none border-b p-0'>
//             {tabs.map((tab) => (
//               <TabsItem
//                 key={tab.value}
//                 value={tab.value}
//                 className={clx(
//                   'bg-background-neutral h-full rounded-none border-0 border-b-2 border-transparent',
//                   'data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:shadow-none'
//                 )}
//               >
//                 {tab.name}
//               </TabsItem>
//             ))}
//           </TabsList>

//           {tabs.map((tab) => (
//             <TabsPanel key={tab.value} value={tab.value}>
//               <Text>{tab.content}</Text>
//             </TabsPanel>
//           ))}
//         </Tabs>
//       </div>
//     )
//   }
// }

// // FIXME: indicator styles (https://shadcnstudio.com/docs/components/tabs)
// export const LiftStyle: Story = {
//   args: {},
//   render: () => {
//     const tabs = [
//       {
//         name: 'Explore',
//         value: 'explore',
//         content: (
//           <>
//             Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending
//             topics, and hidden gems curated just for you. Start exploring and let your curiosity
//             lead the way!
//           </>
//         )
//       },
//       {
//         name: 'Favorites',
//         value: 'favorites',
//         content: (
//           <>
//             All your <span className='text-foreground font-semibold'>favorites</span> are saved
//             here. Revisit articles, collections, and moments you love, any time you want a little
//             inspiration.
//           </>
//         )
//       },
//       {
//         name: 'Surprise Me',
//         value: 'surprise',
//         content: (
//           <>
//             <span className='text-foreground font-semibold'>Surprise!</span> Here&apos;s something
//             unexpected—a fun fact, a quirky tip, or a daily challenge. Come back for a new surprise
//             every day!
//           </>
//         )
//       }
//     ]
//     return (
//       <div className='w-full max-w-md'>
//         <Tabs defaultValue='explore' className='gap-4'>
//           <TabsList className='bg-background-neutral justify-start rounded-none border-b p-0'>
//             {tabs.map((tab) => (
//               <TabsItem
//                 key={tab.value}
//                 value={tab.value}
//                 className='bg-background-neutral border-b-border dark:data-[state=active]:bg-background-neutral data-[state=active]:border-border-neutral data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5'
//               >
//                 {tab.name}
//               </TabsItem>
//             ))}
//           </TabsList>

//           {tabs.map((tab) => (
//             <TabsPanel key={tab.value} value={tab.value}>
//               <Text>{tab.content}</Text>
//             </TabsPanel>
//           ))}
//         </Tabs>
//       </div>
//     )
//   }
// }

// // FIXME: indicator styles (https://shadcnstudio.com/docs/components/tabs)
// export const VerticalLine: Story = {
//   args: {},
//   render: () => {
//     const tabs = [
//       {
//         name: 'Explore',
//         value: 'explore',
//         content: (
//           <>
//             Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending
//             topics, and hidden gems curated just for you. Start exploring and let your curiosity
//             lead the way!
//           </>
//         )
//       },
//       {
//         name: 'Favorites',
//         value: 'favorites',
//         content: (
//           <>
//             All your <span className='text-foreground font-semibold'>favorites</span> are saved
//             here. Revisit articles, collections, and moments you love, any time you want a little
//             inspiration.
//           </>
//         )
//       },
//       {
//         name: 'Surprise Me',
//         value: 'surprise',
//         content: (
//           <>
//             <span className='text-foreground font-semibold'>Surprise!</span> Here&apos;s something
//             unexpected—a fun fact, a quirky tip, or a daily challenge. Come back for a new surprise
//             every day!
//           </>
//         )
//       }
//     ]

//     return (
//       <div className='w-full max-w-lg'>
//         <Tabs defaultValue='explore' className='flex-row'>
//           <TabsList className='bg-background-neutral h-full flex-col rounded-none p-0'>
//             {tabs.map((tab) => (
//               <TabsItem
//                 key={tab.value}
//                 value={tab.value}
//                 className='bg-background-neutral data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none'
//               >
//                 {tab.name}
//               </TabsItem>
//             ))}
//           </TabsList>

//           {tabs.map((tab) => (
//             <TabsPanel key={tab.value} value={tab.value}>
//               <Text>{tab.content}</Text>
//             </TabsPanel>
//           ))}
//         </Tabs>
//       </div>
//     )
//   }
// }
