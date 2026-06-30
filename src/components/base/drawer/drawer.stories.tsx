import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Button } from '#/components/base/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
  DrawerDescription
} from '#/components/base/drawer'
import { Field, FieldLabel } from '#/components/base/field'
import { Input } from '#/components/base/input'
import { ScrollArea } from '#/components/base/scroll-area'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem
} from '#/components/base/select'
import { Card, CardBody } from '#/components/extra/card'
import { Label } from '#/components/extra/label'
import { Stack } from '#/components/extra/stack'
import { Textarea } from '#/components/extra/textarea'

const meta = {
  title: 'Base Components/Drawer',
  component: Drawer,
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
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Drawer swipeDirection='right'>
      <DrawerTrigger render={<Button color='neutral' variant='outline' className='w-28' />}>
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className='mb-2'>Book Review</DrawerTitle>
        <DrawerDescription className='mb-5'>
          Share your thoughts on your favorite novels.
        </DrawerDescription>

        <Stack spacing='lg'>
          {/* Name */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Your Name</Label>
            <Input id='name' placeholder='Robert Langdon' />
          </div>
          {/* Email */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='reader@hogwarts.edu' />
          </div>
          {/* Feedback */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='feedback'>Review</Label>
            <Textarea
              id='feedback'
              placeholder='What did you think about the plot twists and character development?'
              rows={4}
            />
            <p className='text-foreground-neutral-faded-foreground text-sm'>
              Please share your favorite moments from the story
            </p>
          </div>
        </Stack>

        <div className='border-border-neutral mt-6 grid grid-cols-2 gap-3 border-t pt-4'>
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
        <DrawerContent className='gap-2.5 p-0'>
          <div className='px-6 pt-6'>
            <DrawerTitle className='mb-2'>Literary FAQ</DrawerTitle>
            <DrawerDescription>Explore the worlds of Dan Brown and Harry Potter</DrawerDescription>
          </div>

          <div className='mt-2 grow py-0'>
            <ScrollArea
              className='-me-3 h-[calc(100dvh-12rem)] ps-6 pe-6 text-sm'
              scrollbar='vertical'
            >
              <div className='[&_h3]:text-foreground space-y-4 pb-6 [&_h3]:font-semibold'>
                {faqSections.map((faq) => (
                  <div key={faq.title} className='text-accent-foreground space-y-1'>
                    <h3>{faq.title}</h3>
                    <p>{faq.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className='border-border-neutral flex border-t px-6 py-4'>
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
    <div className='flex items-center gap-6'>
      <Drawer swipeDirection='up'>
        <DrawerTrigger render={<Button color='neutral' variant='outline' className='w-28' />}>
          <Icon.ArrowUp /> Top
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className='mb-2'>Favorite Character</DrawerTitle>
          <DrawerDescription className='mb-5'>
            Who is your favorite literary character?
          </DrawerDescription>

          <Stack spacing='lg'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name-top'>Your Name</Label>
              <Input id='name-top' placeholder='Hermione Granger' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email-top'>Email</Label>
              <Input id='email-top' type='email' placeholder='reader@langdon.edu' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='feedback-top'>Why This Character?</Label>
              <Textarea
                id='feedback-top'
                placeholder='Tell us why you love this character and their memorable moments...'
                rows={4}
              />
              <p className='text-foreground-neutral-faded-foreground text-sm'>
                Share your favorite quotes and scenes
              </p>
            </div>
          </Stack>

          <div className='mt-6 flex gap-3'>
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer swipeDirection='down'>
        <DrawerTrigger render={<Button color='neutral' variant='outline' className='w-28' />}>
          <Icon.ArrowDown /> Bottom
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className='mb-2'>Book Recommendation</DrawerTitle>
          <DrawerDescription className='mb-5'>
            Recommend your favorite thriller or fantasy novel
          </DrawerDescription>

          <Stack spacing='lg'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name-bottom'>Your Name</Label>
              <Input id='name-bottom' placeholder='Albus Dumbledore' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email-bottom'>Email</Label>
              <Input id='email-bottom' type='email' placeholder='reader@poudlard.fr' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='feedback-bottom'>Book Details</Label>
              <Textarea
                id='feedback-bottom'
                placeholder='Which book would you recommend and why? What makes it special?'
                rows={4}
              />
              <p className='text-foreground-neutral-faded-foreground text-sm'>
                Include genre, author, and what readers will love
              </p>
            </div>
          </Stack>

          <div className='mt-6 flex gap-3'>
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer swipeDirection='right'>
        <DrawerTrigger render={<Button color='neutral' variant='outline' className='w-28' />}>
          <Icon.ArrowRight /> Right
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className='mb-2'>Mystery Solver</DrawerTitle>
          <DrawerDescription className='mb-5'>
            Test your knowledge of symbols and codes
          </DrawerDescription>

          <Stack spacing='lg'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name-right'>Detective Name</Label>
              <Input id='name-right' placeholder='Robert Langdon' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email-right'>Email</Label>
              <Input id='email-right' type='email' placeholder='symbologist@harvard.edu' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='feedback-right'>Your Theory</Label>
              <Textarea
                id='feedback-right'
                placeholder='What ancient symbol or code have you discovered? Explain your theory...'
                rows={4}
              />
              <p className='text-foreground-neutral-faded-foreground text-sm'>
                Include historical context and evidence
              </p>
            </div>
          </Stack>

          <div className='mt-6 flex gap-3'>
            <DrawerClose render={<Button color='neutral' variant='outline' />}>Cancel</DrawerClose>
            <Button type='submit'>Submit</Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer swipeDirection='left'>
        <DrawerTrigger render={<Button color='neutral' variant='outline' className='w-28' />}>
          <Icon.ArrowLeft /> Left
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className='mb-2'>Spell Collection</DrawerTitle>
          <DrawerDescription className='mb-5'>
            Share your favorite magical spells and charms
          </DrawerDescription>

          <Stack spacing='lg'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name-left'>Wizard Name</Label>
              <Input id='name-left' placeholder='Harry Potter' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email-left'>Email</Label>
              <Input id='email-left' type='email' placeholder='owl@hogwarts.edu' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='feedback-left'>Spell Details</Label>
              <Textarea
                id='feedback-left'
                placeholder='What spell do you want to share? Describe its incantation and effects...'
                rows={4}
              />
              <p className='text-foreground-neutral-faded-foreground text-sm'>
                Include pronunciation and practical uses
              </p>
            </div>
          </Stack>

          <div className='mt-6 flex gap-3'>
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
      <div className='flex flex-wrap items-center gap-6'>
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
      <DrawerContent className='mx-auto max-w-lg'>
        <DrawerTitle className='mb-2 text-lg'>Literary Quests</DrawerTitle>
        <DrawerDescription className='mb-6 text-base'>
          Choose your adventure through mysteries and magic.
        </DrawerDescription>

        <Stack spacing='sm'>
          <Card
            variant='ghost'
            className={
              adventure === 'brown'
                ? 'border-foreground-primary bg-background-primary-faded'
                : 'border-border-neutral hover:bg-background-neutral-faded cursor-pointer'
            }
            onClick={() => setAdventure('brown')}
          >
            <CardBody className='p-4'>
              <div className='font-medium'>Dan Brown's Mysteries</div>
              <div className='text-foreground-neutral-faded text-sm'>
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
            <CardBody className='p-4'>
              <div className='font-medium'>Wizarding World</div>
              <div className='text-foreground-neutral-faded text-sm'>
                Explore the magical realm of Hogwarts
              </div>
            </CardBody>
          </Card>
        </Stack>

        <div className='mt-6 flex justify-end'>
          <DrawerClose render={<Button color='neutral' variant='outline' />}>Close</DrawerClose>
        </div>

        <Drawer
          swipeDirection={swipeDirection}
          open={secondOpen}
          onOpenChange={(nextOpen) => {
            setSecondOpen(nextOpen)
          }}
        >
          <DrawerTrigger className='text-foreground-primary hover:bg-background-primary-faded focus-visible:outline-border-primary active:bg-background-primary/10 -m-0.5 rounded px-1.5 py-0.5 text-base font-medium focus-visible:outline focus-visible:-outline-offset-1'>
            {adventure === 'brown' ? 'Continue to Vatican Archives' : 'Continue to Hogwarts Houses'}
          </DrawerTrigger>
          <DrawerContent className='mx-auto max-w-lg'>
            <DrawerTitle className='mb-2 text-lg'>
              {adventure === 'brown' ? 'Vatican Secret Archives' : 'Hogwarts House Selection'}
            </DrawerTitle>
            <DrawerDescription className='mb-6 text-base'>
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
                  className='h-28 resize-y'
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

            <div className='mt-6 flex justify-end'>
              <DrawerClose render={<Button />}>Done</DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  )
}
