import './style.css'
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'

function ScrollArea({
  children,
  scrollFade = false,
  ...props
}: ScrollAreaPrimitive.Root.Props & { scrollFade?: boolean }) {
  return (
    <ScrollAreaPrimitive.Root data-ui='scroll-area' {...props}>
      <ScrollAreaPrimitive.Viewport data-ui='scroll-area-viewport' data-scroll-fade={scrollFade}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation='horizontal' />
      <ScrollBar orientation='vertical' />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({ orientation = 'vertical', ...props }: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-ui='scroll-area-scrollbar'
      data-orientation={orientation}
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb data-ui='scroll-area-thumb' />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
