import * as stylex from '@stylexjs/stylex'
import { space, stroke } from '#/lib/constants.stylex'
import { radius } from '#/styles/core/size.stylex'

export const toggleGroupStyles = stylex.create({
  root: {
    display: 'flex',
    width: 'fit-content'
  },
  gap: {
    gap: space.s2
  },
  item: {
    flexShrink: 0
  }
})

export const toggleGroupOrientations = stylex.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  vertical: {
    alignItems: 'stretch',
    flexDirection: 'column'
  }
})

export const toggleGroupJoinedItems = stylex.create({
  horizontal: {
    borderBottomLeftRadius: { default: 0, ':first-child': radius.large },
    borderBottomRightRadius: { default: 0, ':last-child': radius.large },
    borderTopLeftRadius: { default: 0, ':first-child': radius.large },
    borderTopRightRadius: { default: 0, ':last-child': radius.large },
    paddingInline: space.s2
  },
  vertical: {
    borderBottomLeftRadius: { default: 0, ':last-child': radius.large },
    borderBottomRightRadius: { default: 0, ':last-child': radius.large },
    borderTopLeftRadius: { default: 0, ':first-child': radius.large },
    borderTopRightRadius: { default: 0, ':first-child': radius.large },
    paddingInline: space.s2
  }
})

// Joined outline items share edges — drop the leading border on every item
// but the first so adjacent borders don't double up.
export const toggleGroupJoinedOutline = stylex.create({
  horizontal: {
    borderLeftWidth: { default: 0, ':first-child': stroke.border }
  },
  vertical: {
    borderTopWidth: { default: 0, ':first-child': stroke.border }
  }
})
