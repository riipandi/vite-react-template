import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar } from '#/styles/tokens.stylex'

// ans: child selectors (*:data-[slot=toggle-group], [&>button]) skipped — no parent-child
//     style injection in current stylex component architecture
export const toolbarStyles = stylex.create({
  root: {
    backgroundColor: colorVar.bgPage,
    borderColor: colorVar.borderNeutral,
    display: 'flex',
    alignItems: 'center',
    borderRadius: radiusVar.sm,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingInline: spaceVar[2],
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1]
  },
  button: {
    borderRadius: radiusVar.xs
  },
  link: {
    fontSize: fontSizeVar.sm
  },
  input: {},
  group: {
    display: 'flex',
    gap: spaceVar[1]
  },
  separator: {
    backgroundColor: colorVar.bgNeutral,
    marginLeft: spaceVar[2],
    marginRight: spaceVar[2],
    height: '1.25rem',
    width: '1px'
  }
})
