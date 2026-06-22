import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link } from '@tanstack/react-router'
import { colors, fontSize, fontWeight, radius, space } from '#/styles/tokens.stylex'

export const Route = createFileRoute('/$')({
  component: NotFoundComponent
})

const styles = stylex.create({
  content: {
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    textAlign: 'center',
    '@media (min-width: 640px)': {
      paddingLeft: space[6],
      paddingRight: space[6]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[8],
      paddingRight: space[8]
    }
  },
  title: {
    display: 'block',
    fontSize: fontSize['7xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc800,
    '@media (min-width: 640px)': {
      fontSize: fontSize['8xl']
    }
  },
  message: {
    marginTop: space[6],
    fontSize: fontSize.lg,
    color: colors.zinc500,
    '@media (min-width: 640px)': {
      marginTop: space[8]
    }
  },
  actionWrapper: {
    marginTop: space[8],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[2],
    borderRadius: radius.md,
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary600,
    textDecoration: 'none',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    ':hover': {
      textDecoration: 'underline'
    },
    ':focus-visible': {
      outlineWidth: 1,
      outlineStyle: 'solid',
      outlineColor: colors.primary500,
      outlineOffset: 2
    }
  },
  footer: {
    marginTop: 'auto',
    paddingTop: space[5],
    paddingBottom: space[5],
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: space[4],
    paddingRight: space[4],
    '@media (min-width: 640px)': {
      paddingLeft: space[6],
      paddingRight: space[6]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[8],
      paddingRight: space[8]
    }
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.zinc400
  }
})

function NotFoundComponent() {
  return (
    <div
      {...stylex.props(
        x.marginLeft.auto,
        x.marginRight.auto,
        x.display.flex,
        x.height['100%'],
        x.minHeight['100vh'],
        x.width['100%'],
        x.flexDirection.column
      )}
    >
      <header {...stylex.props(x.marginBottom.auto, x.width['100%'])} aria-hidden />
      <div {...stylex.props(styles.content)}>
        <h1 {...stylex.props(styles.title)}>404</h1>
        <div {...stylex.props(styles.message)}>
          <p {...stylex.props(x.lineHeight['2rem'])}>Oops, something went wrong.</p>
          <p {...stylex.props(x.lineHeight['2rem'])}>Sorry, we couldn&rsquo;t find your page.</p>
        </div>
        <div {...stylex.props(styles.actionWrapper)}>
          <Link to='/' {...stylex.props(styles.backLink)}>
            <svg
              {...stylex.props(x.height['1rem'], x.width['1rem'])}
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                d='M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
              />
            </svg>
            Back to main page
          </Link>
        </div>
      </div>
      <footer {...stylex.props(styles.footer)}>
        <div {...stylex.props(styles.footerInner)}>
          <p {...stylex.props(styles.footerText)}>
            &copy; All Rights Reserved. {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
