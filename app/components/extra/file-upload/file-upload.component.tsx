import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fileUploadStyles as styles } from './file-upload.stylex'

export interface FileUploadChangeArgs {
  name: string
  value: File[]
  event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
}

export interface FileUploadProps extends Omit<
  useRender.ComponentProps<'div'>,
  'children' | 'onChange' | 'style'
> {
  /** Name of the input element */
  name: string
  /** Disable the file upload input */
  disabled?: boolean
  /** Node for inserting children, can be a render function that receives component state */
  children?: React.ReactNode | ((props: { highlighted?: boolean }) => React.ReactNode)
  /** Callback when the component value is changed */
  onChange?: (args: FileUploadChangeArgs) => void
  /** Component height, literal css value or px number */
  height?: string | number
  /** Headless variant is useful for rendering custom triggers like a Button */
  variant?: 'outline' | 'headless'
  /** Render inline making the component more compact */
  inline?: boolean
  /** Additional attributes for the input element */
  inputAttributes?: React.ComponentPropsWithoutRef<'input'>
  style?: stylex.StyleXStyles
}

export function FileUpload({
  name,
  children,
  height,
  variant = 'outline',
  inline = false,
  disabled = false,
  onChange,
  inputAttributes,
  style,
  render,
  ...otherProps
}: FileUploadProps) {
  const [highlighted, setHighlighted] = React.useState(false)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    otherProps.onDragOver?.(event)
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return
    setHighlighted(true)
    otherProps.onDragEnter?.(event)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    // Ignore elements inside the field
    if (event.currentTarget.contains(event.relatedTarget as Node)) return
    setHighlighted(false)
    otherProps.onDragLeave?.(event)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (disabled) return
    setHighlighted(false)
    onChange?.({ name, value: Array.from(event.dataTransfer.files), event })
    otherProps.onDrop?.(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.files
    if (!nextValue) return
    onChange?.({ name, value: Array.from(nextValue), event })
  }

  const inputNode = (
    <input
      {...inputAttributes}
      {...stylex.props(styles.input)}
      type='file'
      name={name}
      disabled={disabled}
      onChange={handleChange}
    />
  )

  const childrenNode = typeof children === 'function' ? children({ highlighted }) : children

  const layerClass = variant === 'outline' ? styles.outline : styles.headless

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        ...stylex.props(
          styles.root,
          inline && styles.inline,
          highlighted && styles.highlighted,
          disabled && styles.disabled,
          style
        ),
        style: height != null ? { height } : undefined,
        onDragOver: handleDragOver,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children: (
          <label
            {...stylex.props(
              styles.layer,
              inline && styles.layerCompact,
              layerClass,
              highlighted && styles.highlighted,
              disabled && styles.disabled
            )}
          >
            {inputNode}
            <span {...stylex.props(styles.content)}>{childrenNode}</span>
          </label>
        )
      },
      otherProps
    )
  })
}

/**
 * Marks a nested element as the visually expected trigger. The whole
 * FileUpload area stays clickable through its label; this only keeps the
 * composition in the text flow.
 */
export function FileUploadTrigger({ children, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span {...props} {...stylex.props(styles.trigger)}>
      {children}
    </span>
  )
}
