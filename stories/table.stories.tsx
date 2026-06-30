import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from '#/components/base/table'

const meta = {
  title: 'Component/Table',
  component: Table,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: { width: '100%', maxWidth: '40rem' }
})

const sampleRows = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active', email: 'bob@example.com' },
  { id: 3, name: 'Carol Davis', role: 'Manager', status: 'Inactive', email: 'carol@example.com' },
  { id: 4, name: 'Dan Wilson', role: 'Engineer', status: 'Active', email: 'dan@example.com' },
  { id: 5, name: 'Eve Martin', role: 'Designer', status: 'Active', email: 'eve@example.com' }
]

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='table-playground'>
      <Table id='table-playground-el'>
        <TableCaption id='table-playground-caption'>Team members overview</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead id='table-playground-head-name'>Name</TableHead>
            <TableHead id='table-playground-head-role'>Role</TableHead>
            <TableHead id='table-playground-head-status'>Status</TableHead>
            <TableHead id='table-playground-head-email'>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleRows.map((row) => (
            <TableRow key={row.id} id={`table-playground-row-${row.id}`}>
              <TableCell id={`table-playground-cell-${row.id}-name`}>{row.name}</TableCell>
              <TableCell id={`table-playground-cell-${row.id}-role`}>{row.role}</TableCell>
              <TableCell id={`table-playground-cell-${row.id}-status`}>{row.status}</TableCell>
              <TableCell id={`table-playground-cell-${row.id}-email`}>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell id='table-playground-footer-total' colSpan={3}>
              Total Members
            </TableCell>
            <TableCell id='table-playground-footer-count'>{sampleRows.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export const Default: Story = {
  name: 'Sample Data',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='table-sample'>
      <Table id='table-sample-el'>
        <TableCaption id='table-sample-caption'>Project milestones</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead id='table-sample-head-milestone'>Milestone</TableHead>
            <TableHead id='table-sample-head-due'>Due Date</TableHead>
            <TableHead id='table-sample-head-owner'>Owner</TableHead>
            <TableHead id='table-sample-head-status'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell id='table-sample-cell-1-milestone'>Research</TableCell>
            <TableCell id='table-sample-cell-1-due'>2025-01-15</TableCell>
            <TableCell id='table-sample-cell-1-owner'>Alice</TableCell>
            <TableCell id='table-sample-cell-1-status'>Complete</TableCell>
          </TableRow>
          <TableRow>
            <TableCell id='table-sample-cell-2-milestone'>Design</TableCell>
            <TableCell id='table-sample-cell-2-due'>2025-02-28</TableCell>
            <TableCell id='table-sample-cell-2-owner'>Bob</TableCell>
            <TableCell id='table-sample-cell-2-status'>In Progress</TableCell>
          </TableRow>
          <TableRow>
            <TableCell id='table-sample-cell-3-milestone'>Development</TableCell>
            <TableCell id='table-sample-cell-3-due'>2025-04-30</TableCell>
            <TableCell id='table-sample-cell-3-owner'>Carol</TableCell>
            <TableCell id='table-sample-cell-3-status'>Not Started</TableCell>
          </TableRow>
          <TableRow>
            <TableCell id='table-sample-cell-4-milestone'>Testing</TableCell>
            <TableCell id='table-sample-cell-4-due'>2025-05-30</TableCell>
            <TableCell id='table-sample-cell-4-owner'>Dan</TableCell>
            <TableCell id='table-sample-cell-4-status'>Not Started</TableCell>
          </TableRow>
          <TableRow>
            <TableCell id='table-sample-cell-5-milestone'>Launch</TableCell>
            <TableCell id='table-sample-cell-5-due'>2025-06-15</TableCell>
            <TableCell id='table-sample-cell-5-owner'>Eve</TableCell>
            <TableCell id='table-sample-cell-5-status'>Not Started</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell id='table-sample-footer-label' colSpan={3}>
              Total Milestones
            </TableCell>
            <TableCell id='table-sample-footer-count'>5</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
