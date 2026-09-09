import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { Badge } from '#/components/extra/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/extra/card'
import { colors } from '#/styles/core/colors.stylex'
import { container, duration, stroke } from '#/styles/core/tokens.stylex'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from './description-list.component'

const meta = {
  title: 'Extra Components/DescriptionList',
  component: DescriptionList,
  parameters: { layout: 'padded' },
  tags: [] // ['autodocs']
} satisfies Meta<typeof DescriptionList>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  frame: {
    marginInline: 'auto',
    maxWidth: container.xxlarge,
    width: '100%'
  },
  link: {
    color: colors.foregroundPrimary,
    outlineOffset: stroke.ring1,
    textDecorationColor: {
      default: colors.borderPrimaryFaded,
      ':hover': colors.foregroundPrimary
    },
    textDecorationLine: 'underline',
    textDecorationThickness: stroke.ring1,
    textUnderlineOffset: stroke.ring2,
    transitionDuration: duration.fast,
    transitionProperty: 'color, text-decoration-color',
    ':focus-visible': {
      outline: `${stroke.ring2} solid ${colors.foregroundPrimary}`,
      outlineOffset: stroke.ring1
    }
  }
})

const order = {
  number: 'ORD-0071',
  date: 'September 9, 2026',
  purchasedAt: 'Vault & Quill, Diagon Alley',
  email: 'hpotter@owlpost.magic',
  vat: 'GB 000 0000 00'
}

export const Default: Story = {
  render: (args) => (
    <DescriptionList {...args} style={styles.frame}>
      <DescriptionTerm>Order number</DescriptionTerm>
      <DescriptionDetails>{order.number}</DescriptionDetails>
      <DescriptionTerm>Date</DescriptionTerm>
      <DescriptionDetails>{order.date}</DescriptionDetails>
      <DescriptionTerm>Purchased at</DescriptionTerm>
      <DescriptionDetails>{order.purchasedAt}</DescriptionDetails>
      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>{order.email}</DescriptionDetails>
      <DescriptionTerm>VAT</DescriptionTerm>
      <DescriptionDetails>{order.vat}</DescriptionDetails>
    </DescriptionList>
  ),
  play: async ({ canvas }) => {
    expect(canvas.getAllByRole('term')).toHaveLength(5)
    expect(canvas.getAllByRole('definition')).toHaveLength(5)
    expect(canvas.getByText('ORD-0071')).toBeInTheDocument()
  }
}

export const LongValues: Story = {
  name: 'Long values',
  render: (args) => (
    <DescriptionList {...args} style={styles.frame}>
      <DescriptionTerm>Shipping address</DescriptionTerm>
      <DescriptionDetails>
        4 Privet Drive, Little Whinging, Surrey, United Kingdom, WD17 1AA — leave the parcel with
        the owl keeper at the side gate if nobody answers the door.
      </DescriptionDetails>
      <DescriptionTerm>Billing address</DescriptionTerm>
      <DescriptionDetails>The Burrow, Ottery St Catchpole, Devon, EX22 7NB</DescriptionDetails>
      <DescriptionTerm>Delivery notes</DescriptionTerm>
      <DescriptionDetails>
        Beware of the ticklish tree by the gate. Muggle shipping partners are not permitted past the
        wardline after dusk.
      </DescriptionDetails>
    </DescriptionList>
  )
}

export const WithBadges: Story = {
  name: 'With badges',
  render: (args) => (
    <DescriptionList {...args} style={styles.frame}>
      <DescriptionTerm>Payment status</DescriptionTerm>
      <DescriptionDetails>
        <Badge variant='secondary'>Paid</Badge>
      </DescriptionDetails>
      <DescriptionTerm>Priority</DescriptionTerm>
      <DescriptionDetails>
        <Badge variant='destructive'>High</Badge>
      </DescriptionDetails>
      <DescriptionTerm>Shipping</DescriptionTerm>
      <DescriptionDetails>
        <Badge variant='outline'>Express owl</Badge>
      </DescriptionDetails>
      <DescriptionTerm>Tracking</DescriptionTerm>
      <DescriptionDetails>HL-7734-GRG</DescriptionDetails>
    </DescriptionList>
  )
}

export const WithLinks: Story = {
  name: 'With links',
  render: (args) => (
    <DescriptionList {...args} style={styles.frame}>
      <DescriptionTerm>Order number</DescriptionTerm>
      <DescriptionDetails>
        {order.number}
        {' — '}
        <a
          {...stylex.props(styles.link)}
          href='https://example.com/invoice/ORD-0071'
          target='_blank'
          rel='noreferrer'
        >
          View invoice
        </a>
      </DescriptionDetails>
      <DescriptionTerm>Payment method</DescriptionTerm>
      <DescriptionDetails>Card ending in 4242</DescriptionDetails>
      <DescriptionTerm>Support</DescriptionTerm>
      <DescriptionDetails>
        <a {...stylex.props(styles.link)} href='mailto:support@example.com'>
          support@example.com
        </a>
      </DescriptionDetails>
    </DescriptionList>
  )
}

export const InACard: Story = {
  name: 'In a card',
  render: (args) => (
    <Card style={styles.frame}>
      <CardHeader>
        <CardTitle>Order details</CardTitle>
        <CardDescription>Placed by Hermione Granger on {order.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <DescriptionList {...args}>
          <DescriptionTerm>Order number</DescriptionTerm>
          <DescriptionDetails>{order.number}</DescriptionDetails>
          <DescriptionTerm>Purchased at</DescriptionTerm>
          <DescriptionDetails>{order.purchasedAt}</DescriptionDetails>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{order.email}</DescriptionDetails>
          <DescriptionTerm>VAT</DescriptionTerm>
          <DescriptionDetails>{order.vat}</DescriptionDetails>
        </DescriptionList>
      </CardContent>
    </Card>
  )
}

export default meta
