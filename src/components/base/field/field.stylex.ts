import * as stylex from '@stylexjs/stylex'
import { colorVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const fieldStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[2],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
  },
  item: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: spaceVar[2]
    // ans: '**:data-[slot=field-description]:col-start-2' — child selector not supported in StyleX
  },
  label: {
    color: colorVar.fgNeutral,
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2]
  },
  description: {
    color: colorVar.fgNeutralFaded,
    paddingInline: spaceVar[1],
    fontSize: fontSizeVar.xs,
    lineHeight: '1.625'
  },
  errorListParent: {
    marginLeft: spaceVar[4],
    display: 'flex',
    // ans: listStyleType not supported in StyleX 0.19
    flexDirection: 'column',
    gap: spaceVar[1]
  },
  errorList: {},
  error: {
    color: colorVar.fgCritical,
    paddingInline: spaceVar[1],
    fontSize: fontSizeVar.xs
  },
  validity: {},
  control: {}
})
