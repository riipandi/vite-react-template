import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
  DrawerDescription
} from '.'
import { fontSize, fontWeight, radius, color } from '../../../styles/tokens.stylex'
import { Card, CardBody } from '../../extra/card'
import { Label } from '../../extra/label'
import { Stack } from '../../extra/stack'
import { Textarea } from '../../extra/textarea'
import { Button } from '../button'
import { Field, FieldLabel } from '../field'
import { Input } from '../input'
import { ScrollArea } from '../scroll-area'
import { Select, SelectTrigger, SelectValue, SelectPopup, SelectList, SelectItem } from '../select'
const meta = {
  title: 'Base Components/Drawer',
  component: Drawer,
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
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  args: {},
  render: () => (
    <Drawer swipeDirection='right'>
      <DrawerTrigger
        render={<Button color='neutral' variant='outline' {...stylex.props(x.width['7rem'])} />}
      >
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
          Book Review
        </DrawerTitle>
        <DrawerDescription {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
          Share your thoughts on your favorite novels.
        </DrawerDescription>
        <Stack spacing='lg'>
          {/* Name */}
          <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
            <Label htmlFor='name'>Your Name</Label>
            <Input id='name' placeholder='Robert Langdon' />
          </div>
          {/* Email */}
          <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='reader@hogwarts.edu' />
          </div>
          {/* Feedback */}
          <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
            <Label htmlFor='feedback'>Review</Label>
            <Textarea
              id='feedback'
              placeholder='What did you think about the plot twists and character development?'
              rows={4}
            />
            <p
              {...stylex.props(x.color[color.fgNeutralFaded])}
              {...stylex.props(x.fontSize[fontSize.sm])}
            >
              Please share your favorite moments from the story
            </p>
          </div>
        </Stack>
        <div
          {...stylex.props(
            x.borderColor[color.borderNeutral],
            x.display.grid,
            x.gridTemplateColumns['1fr 1fr']
          )}
          {...stylex.props(x.borderTopWidth['1px'])}
          {...stylex.props(
            x.marginLeft['0.5rem'],
            x.marginRight['0.5rem'],
            x.gap['0.75rem'],
            x.paddingTop['1rem']
          )}
        >
          <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
          <Button type='submit'>Submit</Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export const Scrollable: Story = {
  args: {},
  render: () => {
    const faqSections = [
      {
        title: "About Dan Brown's Robert Langdon Series",
        content:
          'The Robert Langdon series follows Harvard symbologist Robert Langdon as he unravels mysteries involving secret societies, religious conspiracies, and ancient puzzles. The series includes Angels & Demons, The Da Vinci Code, The Lost Symbol, Inferno, and Origin.'
      },
      {
        title: 'Harry Potter Reading Order',
        content:
          "Start with Harry Potter and the Sorcerer's Stone, followed by Chamber of Secrets, Prisoner of Azkaban, Goblet of Fire, Order of the Phoenix, Half-Blood Prince, and Deathly Hallows. Each book builds upon the previous, revealing the ultimate battle between Harry and Voldemort."
      },
      {
        title: "Dan Brown's Writing Style",
        content:
          'Brown combines fast-paced action with historical facts, religious symbolism, and scientific concepts. His novels are known for cliffhanger chapter endings, real-world locations, and controversial interpretations of art and history.'
      },
      {
        title: 'Hogwarts Houses Explained',
        content:
          "Gryffindor values bravery and daring, home to Harry, Hermione, and Ron. Slytherin prizes ambition and cunning, Voldemort's house. Ravenclaw celebrates wit and wisdom. Hufflepuff embodies loyalty and fair play, welcoming all students."
      },
      {
        title: 'The Da Vinci Code Controversy',
        content:
          'The novel sparked global debate with its claims about Jesus Christ and Mary Magdalene, the Holy Grail, and Opus Dei. While presented as fiction, many readers questioned the line between historical fact and artistic license.'
      },
      {
        title: 'Magical Creatures in Harry Potter',
        content:
          'From loyal hippogriffs like Buckbeak to mischievous house-elves like Dobby, the wizarding world is filled with fantastic beasts. Dragons, phoenixes, centaurs, and the terrifying Dementors guard Azkaban prison.'
      },
      {
        title: "Robert Langdon's Expertise",
        content:
          'As a professor of Religious Symbology and Iconology at Harvard, Langdon decodes ancient symbols, secret society rituals, and hidden messages in artworks. His knowledge makes him invaluable in solving international mysteries.'
      },
      {
        title: 'The Deathly Hallows Explained',
        content:
          'The three Deathly Hallows are the Elder Wand (unbeatable wand), the Resurrection Stone (brings back loved ones), and the Invisibility Cloak (true concealment). Only the possessor of all three becomes the Master of Death.'
      },
      {
        title: "Secret Societies in Brown's Novels",
        content:
          "From the Illuminati and Freemasons to the Priory of Sion, Brown's thrillers explore real and fictional secret organizations. These groups often protect ancient knowledge or pursue hidden agendas spanning centuries."
      }
    ]
    return (
      <Drawer swipeDirection='right'>
        <DrawerTrigger render={<Button color='neutral' variant='outline' />}>
          Open Drawer
        </DrawerTrigger>
        <DrawerContent {...stylex.props(x.gap['0.625rem'], x.padding['0px'])}>
          <div
            {...stylex.props(
              x.paddingLeft['1.5rem'],
              x.paddingRight['1.5rem'],
              x.paddingTop['1.5rem']
            )}
          >
            <DrawerTitle {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
              Literary FAQ
            </DrawerTitle>
            <DrawerDescription>Explore the worlds of Dan Brown and Harry Potter</DrawerDescription>
          </div>
          <div
            {...stylex.props(
              x.marginLeft['0.5rem'],
              x.marginRight['0.5rem'],
              x.paddingTop['0px'],
              x.paddingBottom['0px']
            )}
          >
            <ScrollArea
              {...stylex.props(x.fontSize[fontSize.sm])}
              {...stylex.props(
                x.marginRight['-0.75rem'],
                x.height['calc(100dvh - 12rem)'],
                x.paddingLeft['1.5rem'],
                x.paddingRight['1.5rem']
              )}
              scrollbar='vertical'
            >
              <div {...stylex.props(x.gap['1rem'])} {...stylex.props(x.paddingBottom['1.5rem'])}>
                {faqSections.map((faq) => (
                  <div
                    key={faq.title}
                    {...stylex.props(x.color[color.fgNeutral])}
                    {...stylex.props(x.gap['0.25rem'])}
                  >
                    <h3>{faq.title}</h3>
                    <p>{faq.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div
            {...stylex.props(x.borderColor[color.borderNeutral])}
            {...stylex.props(x.borderTopWidth['1px'])}
            {...stylex.props(
              x.display.flex,
              x.paddingLeft['1.5rem'],
              x.paddingRight['1.5rem'],
              x.paddingTop['1rem'],
              x.paddingBottom['1rem']
            )}
          >
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Close</DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
}
export const SideShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['1.5rem'])}>
      <Drawer swipeDirection='up'>
        <DrawerTrigger
          render={<Button color='neutral' variant='outline' {...stylex.props(x.width['7rem'])} />}
        >
          <Lucide.ArrowUp /> Top
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Favorite Character
          </DrawerTitle>
          <DrawerDescription {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Who is your favorite literary character?
          </DrawerDescription>
          <Stack spacing='lg'>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='name-top'>Your Name</Label>
              <Input id='name-top' placeholder='Hermione Granger' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='email-top'>Email</Label>
              <Input id='email-top' type='email' placeholder='reader@langdon.edu' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='feedback-top'>Why This Character?</Label>
              <Textarea
                id='feedback-top'
                placeholder='Tell us why you love this character and their memorable moments...'
                rows={4}
              />
              <p
                {...stylex.props(x.color[color.fgNeutralFaded])}
                {...stylex.props(x.fontSize[fontSize.sm])}
              >
                Share your favorite quotes and scenes
              </p>
            </div>
          </Stack>
          <div
            {...stylex.props(
              x.marginLeft['0.5rem'],
              x.marginRight['0.5rem'],
              x.display.flex,
              x.gap['0.75rem']
            )}
          >
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection='down'>
        <DrawerTrigger
          render={<Button color='neutral' variant='outline' {...stylex.props(x.width['7rem'])} />}
        >
          <Lucide.ArrowDown /> Bottom
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Book Recommendation
          </DrawerTitle>
          <DrawerDescription {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Recommend your favorite thriller or fantasy novel
          </DrawerDescription>
          <Stack spacing='lg'>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='name-bottom'>Your Name</Label>
              <Input id='name-bottom' placeholder='Albus Dumbledore' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='email-bottom'>Email</Label>
              <Input id='email-bottom' type='email' placeholder='reader@poudlard.fr' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='feedback-bottom'>Book Details</Label>
              <Textarea
                id='feedback-bottom'
                placeholder='Which book would you recommend and why? What makes it special?'
                rows={4}
              />
              <p
                {...stylex.props(x.color[color.fgNeutralFaded])}
                {...stylex.props(x.fontSize[fontSize.sm])}
              >
                Include genre, author, and what readers will love
              </p>
            </div>
          </Stack>
          <div
            {...stylex.props(
              x.marginLeft['0.5rem'],
              x.marginRight['0.5rem'],
              x.display.flex,
              x.gap['0.75rem']
            )}
          >
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection='right'>
        <DrawerTrigger
          render={<Button color='neutral' variant='outline' {...stylex.props(x.width['7rem'])} />}
        >
          <Lucide.ArrowRight /> Right
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Mystery Solver
          </DrawerTitle>
          <DrawerDescription {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Test your knowledge of symbols and codes
          </DrawerDescription>
          <Stack spacing='lg'>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='name-right'>Detective Name</Label>
              <Input id='name-right' placeholder='Robert Langdon' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='email-right'>Email</Label>
              <Input id='email-right' type='email' placeholder='symbologist@harvard.edu' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='feedback-right'>Your Theory</Label>
              <Textarea
                id='feedback-right'
                placeholder='What ancient symbol or code have you discovered? Explain your theory...'
                rows={4}
              />
              <p
                {...stylex.props(x.color[color.fgNeutralFaded])}
                {...stylex.props(x.fontSize[fontSize.sm])}
              >
                Include historical context and evidence
              </p>
            </div>
          </Stack>
          <div
            {...stylex.props(
              x.marginLeft['0.5rem'],
              x.marginRight['0.5rem'],
              x.display.flex,
              x.gap['0.75rem']
            )}
          >
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection='left'>
        <DrawerTrigger
          render={<Button color='neutral' variant='outline' {...stylex.props(x.width['7rem'])} />}
        >
          <Lucide.ArrowLeft /> Left
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Spell Collection
          </DrawerTitle>
          <DrawerDescription {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
            Share your favorite magical spells and charms
          </DrawerDescription>
          <Stack spacing='lg'>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='name-left'>Wizard Name</Label>
              <Input id='name-left' placeholder='Harry Potter' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='email-left'>Email</Label>
              <Input id='email-left' type='email' placeholder='owl@hogwarts.edu' />
            </div>
            <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.5rem'])}>
              <Label htmlFor='feedback-left'>Spell Details</Label>
              <Textarea
                id='feedback-left'
                placeholder='What spell do you want to share? Describe its incantation and effects...'
                rows={4}
              />
              <p
                {...stylex.props(x.color[color.fgNeutralFaded])}
                {...stylex.props(x.fontSize[fontSize.sm])}
              >
                Include pronunciation and practical uses
              </p>
            </div>
          </Stack>
          <div
            {...stylex.props(
              x.marginLeft['0.5rem'],
              x.marginRight['0.5rem'],
              x.display.flex,
              x.gap['0.75rem']
            )}
          >
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
export const Nested: Story = {
  args: {},
  render: () => {
    return (
      <div {...stylex.props(x.display.flex, x.flexWrap.wrap, x.alignItems.center, x.gap['1.5rem'])}>
        <NestedDrawer swipeDirection='up' />
        <NestedDrawer swipeDirection='down' />
        <NestedDrawer swipeDirection='right' />
        <NestedDrawer swipeDirection='left' />
      </div>
    )
  }
}
function NestedDrawer({
  swipeDirection
}: {
  swipeDirection: React.ComponentProps<typeof Drawer>['swipeDirection']
}) {
  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [adventure, setAdventure] = React.useState<'brown' | 'potter'>('brown')
  return (
    <Drawer
      swipeDirection={swipeDirection}
      open={firstOpen}
      onOpenChange={(nextOpen) => {
        setFirstOpen(nextOpen)
        if (!nextOpen) {
          setSecondOpen(false)
        }
      }}
    >
      <DrawerTrigger render={<Button color='neutral' variant='outline' />}>
        Nested {swipeDirection}
      </DrawerTrigger>
      <DrawerContent style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '512px' }}>
        <DrawerTitle
          {...stylex.props(
            x.marginLeft['0.5rem'],
            x.marginRight['0.5rem'],
            x.fontSize[fontSize.lg]
          )}
        >
          Literary Quests
        </DrawerTitle>
        <DrawerDescription
          {...stylex.props(
            x.marginLeft['0.5rem'],
            x.marginRight['0.5rem'],
            x.fontSize[fontSize.md]
          )}
        >
          Choose your adventure through mysteries and magic.
        </DrawerDescription>
        <Stack spacing='sm'>
          <Card
            variant='ghost'
            xstyle={
              adventure === 'brown'
                ? [x.borderColor[color.fgPrimary], x.backgroundColor[color.bgPrimaryFaded]]
                : [x.borderColor[color.borderNeutral], x.backgroundColor[color.bgNeutralFaded]]
            }
            onClick={() => setAdventure('brown')}
          >
            <CardBody {...stylex.props(x.padding['1rem'])}>
              <div {...stylex.props(x.fontWeight[fontWeight.medium])}>Dan Brown's Mysteries</div>
              <div
                {...stylex.props(x.color[color.fgNeutralFaded])}
                {...stylex.props(x.fontSize[fontSize.sm])}
              >
                Follow Robert Langdon through ancient secrets
              </div>
            </CardBody>
          </Card>
          <Card
            variant='ghost'
            className={
              adventure === 'potter'
                ? 'border-foreground-primary bg-background-primary-faded'
                : 'border-border-neutral hover:bg-background-neutral-faded cursor-pointer'
            }
            onClick={() => setAdventure('potter')}
          >
            <CardBody {...stylex.props(x.padding['1rem'])}>
              <div {...stylex.props(x.fontWeight[fontWeight.medium])}>Wizarding World</div>
              <div
                {...stylex.props(x.color[color.fgNeutralFaded])}
                {...stylex.props(x.fontSize[fontSize.sm])}
              >
                Explore the magical realm of Hogwarts
              </div>
            </CardBody>
          </Card>
        </Stack>
        <div
          {...stylex.props(
            x.marginLeft['0.5rem'],
            x.marginRight['0.5rem'],
            x.display.flex,
            x.justifyContent.flexEnd
          )}
        >
          <DrawerClose render={<Button color='neutral' variant='outline' />}>Close</DrawerClose>
        </div>
        <Drawer
          swipeDirection={swipeDirection}
          open={secondOpen}
          onOpenChange={(nextOpen) => {
            setSecondOpen(nextOpen)
          }}
        >
          <DrawerTrigger
            {...stylex.props(x.color[color.fgPrimary], x.backgroundColor[color.bgPrimaryFaded])}
            {...stylex.props(
              x.borderRadius[radius.md],
              x.paddingLeft['0.375rem'],
              x.paddingRight['0.375rem'],
              x.paddingTop['0.5rem'],
              x.paddingBottom['0.5rem'],
              x.fontSize[fontSize.md],
              x.fontWeight[fontWeight.medium]
            )}
          >
            {adventure === 'brown' ? 'Continue to Vatican Archives' : 'Continue to Hogwarts Houses'}
          </DrawerTrigger>
          <DrawerContent style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '512px' }}>
            <DrawerTitle
              {...stylex.props(
                x.marginLeft['0.5rem'],
                x.marginRight['0.5rem'],
                x.fontSize[fontSize.lg]
              )}
            >
              {adventure === 'brown' ? 'Vatican Secret Archives' : 'Hogwarts House Selection'}
            </DrawerTitle>
            <DrawerDescription
              {...stylex.props(
                x.marginLeft['0.5rem'],
                x.marginRight['0.5rem'],
                x.fontSize[fontSize.md]
              )}
            >
              {adventure === 'brown'
                ? 'Hidden beneath the Vatican Secret Archives lies the final clue.'
                : 'Discover which Hogwarts house suits you best.'}
            </DrawerDescription>
            <Stack spacing='lg'>
              <Field>
                <FieldLabel htmlFor='detail-input'>
                  {adventure === 'brown' ? 'Book Title' : 'Your Name'}
                </FieldLabel>
                <Input
                  id='detail-input'
                  defaultValue={adventure === 'brown' ? 'Angels & Demons' : 'Harry Potter'}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='notes-input'>
                  {adventure === 'brown' ? 'Notes' : 'Favorite Subject'}
                </FieldLabel>
                <Textarea
                  id='notes-input'
                  xstyle={x.resize.vertical}
                  {...stylex.props(x.height['28rem'])}
                  defaultValue={
                    adventure === 'brown'
                      ? 'Follow the markers of science to find the Illuminati lair.'
                      : 'Defense Against the Dark Arts and Charms'
                  }
                />
              </Field>
              {adventure === 'potter' && (
                <Field>
                  <FieldLabel htmlFor='house-select'>Preferred House</FieldLabel>
                  <Select defaultValue='Gryffindor'>
                    <SelectTrigger id='house-select'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectList>
                        <SelectItem value='Gryffindor'>Gryffindor</SelectItem>
                        <SelectItem value='Slytherin'>Slytherin</SelectItem>
                        <SelectItem value='Ravenclaw'>Ravenclaw</SelectItem>
                        <SelectItem value='Hufflepuff'>Hufflepuff</SelectItem>
                      </SelectList>
                    </SelectPopup>
                  </Select>
                </Field>
              )}
            </Stack>
            <div
              {...stylex.props(
                x.marginLeft['0.5rem'],
                x.marginRight['0.5rem'],
                x.display.flex,
                x.justifyContent.flexEnd
              )}
            >
              <DrawerClose render={<Button />}>Done</DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  )
}
