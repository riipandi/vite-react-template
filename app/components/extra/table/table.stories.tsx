import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { EllipsisVerticalIcon } from 'lucide-react'
import { Button } from '#/components/base/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/base/dropdown-menu'
import { container } from '#/styles/core/tokens.stylex'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from './table.component'

const meta = {
  title: 'Extra Components/Table',
  component: Table,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Table>

type Story = StoryObj<typeof meta>

const invoices = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', method: 'Bank transfer', amount: '$350.00' },
  { invoice: 'INV004', status: 'Paid', method: 'Credit card', amount: '$450.00' }
]

const footerInvoices = [
  { invoice: 'INV001', method: 'Credit card', amount: 250 },
  { invoice: 'INV002', method: 'PayPal', amount: 150 },
  { invoice: 'INV003', method: 'Bank transfer', amount: 350 }
]

const total = footerInvoices.reduce((sum, row) => sum + row.amount, 0)

const members = [
  { name: 'Ada Lovelace', role: 'Owner' },
  { name: 'Grace Hopper', role: 'Admin' },
  { name: 'Margaret Hamilton', role: 'Member' }
]

const styles = stylex.create({
  root: {
    maxWidth: container.xl,
    width: '100%'
  },
  footerRoot: {
    maxWidth: container.lg,
    width: '100%'
  },
  actionsRoot: {
    maxWidth: container.lg,
    width: '100%'
  },
  right: {
    textAlign: 'right'
  },
  icon: { height: 16, width: 16 }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.root)}>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead style={styles.right}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((row) => (
            <TableRow key={row.invoice}>
              <TableCell>{row.invoice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell style={styles.right}>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell style={styles.right}>$1,200.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export const Footer: Story = {
  render: () => (
    <div {...stylex.props(styles.footerRoot)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Method</TableHead>
            <TableHead style={styles.right}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {footerInvoices.map((row) => (
            <TableRow key={row.invoice}>
              <TableCell>{row.invoice}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell style={styles.right}>${row.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell style={styles.right}>${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export const Actions: Story = {
  render: () => (
    <div {...stylex.props(styles.actionsRoot)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead style={styles.right} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.name}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell style={styles.right}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant='ghost' size='icon' aria-label='Row actions' />}
                  >
                    <EllipsisVerticalIcon {...stylex.props(styles.icon)} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Edit role</DropdownMenuItem>
                    <DropdownMenuItem>Copy email</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant='destructive'>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
