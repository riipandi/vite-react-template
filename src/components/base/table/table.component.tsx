import { ScrollArea } from '../scroll-area'
import './style.css'

function Table(props: React.ComponentProps<'table'>) {
  return (
    <ScrollArea data-slot='table-container'>
      <table data-ui='table' {...props} />
    </ScrollArea>
  )
}

function TableHeader(props: React.ComponentProps<'thead'>) {
  return <thead data-ui='table-header' {...props} />
}

function TableBody(props: React.ComponentProps<'tbody'>) {
  return <tbody data-ui='table-body' {...props} />
}

function TableFooter(props: React.ComponentProps<'tfoot'>) {
  return <tfoot data-ui='table-footer' {...props} />
}

function TableRow(props: React.ComponentProps<'tr'>) {
  return <tr data-ui='table-row' {...props} />
}

function TableHead(props: React.ComponentProps<'th'>) {
  return <th data-ui='table-head' {...props} />
}

function TableCell(props: React.ComponentProps<'td'>) {
  return <td data-ui='table-cell' {...props} />
}

function TableCaption(props: React.ComponentProps<'caption'>) {
  return <caption data-ui='table-caption' {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
