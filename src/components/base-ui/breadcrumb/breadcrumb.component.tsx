import './style.css'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as Lucide from 'lucide-react'

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-ui='breadcrumb' {...props} />
}

function BreadcrumbList({ ...props }: React.ComponentProps<'ol'>) {
  return <ol data-ui='breadcrumb-list' {...props} />
}

function BreadcrumbItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-ui='breadcrumb-item' {...props} />
}

function BreadcrumbLink({ render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>({}, props),
    render,
    state: {
      ui: 'breadcrumb-link'
    }
  })
}
function BreadcrumbSeparator({ children, ...props }: React.ComponentProps<'li'>) {
  return (
    <li data-ui='breadcrumb-separator' role='presentation' aria-hidden='true' {...props}>
      {children ?? <Lucide.ChevronRight size={16} />}
    </li>
  )
}

function BreadcrumbEllipsis({ ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-ui='breadcrumb-ellipsis' role='presentation' aria-hidden='true' {...props}>
      <Lucide.MoreHorizontal size={16} />
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
