/**
 * Image component with Reshaped-inspired API.
 *
 * No Base UI equivalent — created from scratch using StyleX.
 * Uses `useRender` from Base UI for render prop polymorphism.
 *
 * Adapted from Reshaped's mixin system for StyleX:
 * - Uses StyleX tokens instead of CSS custom properties
 * - Uses stylex.props() instead of classNames composition
 *
 * Usage:
 *   <Image src="/photo.jpg" alt="Photo" />
 *   <Image src="/photo.jpg" alt="Photo" width="200" height="200" borderRadius="large" />
 *   <Image src="/photo.jpg" alt="Photo" outline displayMode="contain" />
 *   <Image fallback="No image" />
 *   <Image renderImage={(props) => <NextImage {...props} />} />
 */

import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { imageStyles as s } from './image.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ImageDisplayMode = 'cover' | 'contain'
type BorderRadiusToken = keyof typeof s.borderRadius

type ImageRenderProp =
  | React.ReactElement
  | ((
      props: React.HTMLAttributes<HTMLElement>,
      state: Record<string, unknown>
    ) => React.ReactElement)

export type ImageProps = React.ComponentProps<'img'> & {
  /** Image URL */
  src?: string
  /** Image alt text */
  alt?: string
  /** Image width (CSS value) */
  width?: string | number
  /** Image height (CSS value) */
  height?: string | number
  /** Image max width (CSS value) */
  maxWidth?: string | number
  /** Image aspect ratio (width / height) */
  aspectRatio?: string
  /** Image border radius */
  borderRadius?: BorderRadiusToken
  /** Image display mode */
  displayMode?: ImageDisplayMode
  /** Add a semi-transparent border for better background contrast */
  outline?: boolean
  /** Image fallback content if the image fails to load or was not provided */
  fallback?: string | React.ReactNode | boolean
  /** Image on load event */
  onLoad?: (e: React.SyntheticEvent) => void
  /** Image on error event */
  onError?: (e: React.SyntheticEvent) => void
  /** Additional attributes for the image element */
  imageAttributes?: React.ComponentProps<'img'>
  /** Image render function for integrating with 3rd party image components */
  renderImage?: (
    props: React.ComponentProps<'img'> & { src: string; alt: string }
  ) => React.ReactNode
  /** Render prop for polymorphism */
  render?: ImageRenderProp
  /** StyleX styles to apply */
  xstyle?: stylex.StyleXStyles
}

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

export function Image({
  src,
  alt,
  width,
  height,
  maxWidth,
  aspectRatio,
  borderRadius,
  displayMode = 'cover',
  outline: hasOutline = false,
  fallback,
  onLoad,
  onError,
  imageAttributes: passedImageAttributes,
  renderImage,
  xstyle,
  className,
  ...otherProps
}: ImageProps) {
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading')

  // Resolve mixin-like styles
  const resolvedStyles = resolveImageMixin({ width, height, maxWidth, aspectRatio })

  const rootSx = stylex.props(
    hasOutline && s.root.root,
    borderRadius && s.borderRadius[borderRadius],
    hasOutline && s.outline.root,
    xstyle
  )

  const imageSx = stylex.props(s.image.root, displayMode && s.image[`display-mode-${displayMode}`])

  const isFallback = (status === 'error' || !src) && !!fallback

  const handleLoad = (e: React.SyntheticEvent) => {
    setStatus('success')
    onLoad?.(e)
    passedImageAttributes?.onLoad?.(e as React.ChangeEvent<HTMLImageElement>)
  }

  const handleError = (e: React.SyntheticEvent) => {
    setStatus('error')
    onError?.(e)
    passedImageAttributes?.onError?.(e as React.ChangeEvent<HTMLImageElement>)
  }

  React.useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setStatus('loading')
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [src])

  // Build inline styles from resolved mixin
  const resolvedStyle = {
    ...resolvedStyles.style,
    ...rootSx.style
  } as React.CSSProperties

  // Fallback rendering
  if (isFallback) {
    if (typeof fallback === 'string') {
      const imgProps = {
        ...otherProps,
        ...passedImageAttributes,
        src: fallback ?? '',
        alt: alt ?? '',
        role: alt ? undefined : ('presentation' as const),
        className: [rootSx.className, className].filter(Boolean).join(' ') || undefined,
        style: resolvedStyle
      }

      const fallbackImage = renderImage ? (
        renderImage(imgProps)
      ) : (
        // oxlint-disable-next-line jsx-a11y/alt-text
        <img data-slot='image-fallback' {...imgProps} />
      )

      return <>{fallbackImage}</>
    }

    return (
      <div data-slot='image-fallback' {...stylex.props(s.fallback.root)}>
        {fallback}
      </div>
    )
  }

  // Normal image rendering
  const imageProps = {
    ...otherProps,
    ...passedImageAttributes,
    src: src ?? '',
    alt: alt ?? '',
    role: alt ? undefined : ('presentation' as const),
    onLoad: handleLoad,
    onError: handleError,
    className:
      [
        hasOutline
          ? imageSx.className
          : [imageSx.className, rootSx.className].filter(Boolean).join(' '),
        className
      ]
        .filter(Boolean)
        .join(' ') || undefined,
    style: resolvedStyle
  }

  const imageNode = renderImage ? (
    renderImage(imageProps)
  ) : (
    // oxlint-disable-next-line jsx-a11y/alt-text
    <img data-slot='image' {...imageProps} />
  )

  if (hasOutline) {
    return (
      <div data-slot='image-wrapper' className={rootSx.className} style={rootSx.style}>
        {imageNode}
      </div>
    )
  }

  return <>{imageNode}</>
}

Image.displayName = 'Image'

// ---------------------------------------------------------------------------
// Mixin resolver (adapted from Reshaped's resolveMixin)
// ---------------------------------------------------------------------------

interface MixinInput {
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  aspectRatio?: string
}

interface MixinOutput {
  style?: React.CSSProperties
}

/**
 * Resolves mixin-like props into inline styles.
 *
 * Reshaped's resolveMixin returns `{ variables, classNames }` for CSS custom
 * properties and CSS module classes. In StyleX, we resolve to inline styles
 * for dynamic values that aren't in our token system.
 */
function resolveImageMixin(input: MixinInput): MixinOutput {
  const style: React.CSSProperties = {}

  if (input.width !== undefined) {
    style.width = typeof input.width === 'number' ? `${input.width}px` : input.width
  }

  if (input.height !== undefined) {
    style.height = typeof input.height === 'number' ? `${input.height}px` : input.height
  }

  if (input.maxWidth !== undefined) {
    style.maxWidth = typeof input.maxWidth === 'number' ? `${input.maxWidth}px` : input.maxWidth
  }

  if (input.aspectRatio !== undefined) {
    style.aspectRatio = input.aspectRatio
  }

  return { style: Object.keys(style).length > 0 ? style : undefined }
}
