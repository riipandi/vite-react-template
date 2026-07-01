import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { fontSizeVar, fontWeightVar, radiusVar, spaceVar, colorVar } from '#/styles/tokens.stylex'

const styles = stylex.create({
  content: {
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    textAlign: 'center',
    '@media (min-width: 640px)': {
      paddingLeft: spaceVar[6],
      paddingRight: spaceVar[6]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: spaceVar[8],
      paddingRight: spaceVar[8]
    }
  },
  title: {
    display: 'block',
    fontSize: fontSizeVar['7xl'],
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    '@media (min-width: 640px)': {
      fontSize: fontSizeVar['8xl']
    }
  },
  message: {
    marginTop: spaceVar[6],
    fontSize: fontSizeVar.lg,
    color: colorVar.fgNeutralFaded,
    '@media (min-width: 640px)': {
      marginTop: spaceVar[8]
    }
  },
  actionWrapper: {
    marginTop: spaceVar[8],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spaceVar[2],
    borderRadius: radiusVar.md,
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgPrimary,
    textDecoration: 'none',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    ':hover': {
      textDecoration: 'underline'
    },
    ':focus-visible': {
      outlineWidth: 1,
      outlineStyle: 'solid',
      outlineColor: colorVar.fgPrimary,
      outlineOffset: 2
    }
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spaceVar[5],
    paddingBottom: spaceVar[5],
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    '@media (min-width: 640px)': {
      paddingLeft: spaceVar[6],
      paddingRight: spaceVar[6]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: spaceVar[8],
      paddingRight: spaceVar[8]
    }
  },
  footerText: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded
  }
})

export function GlobalNotFound() {
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

export function GlobalError({ error, reset }: ErrorComponentProps) {
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
        <h1 {...stylex.props(styles.title)}>Oops!</h1>
        <div {...stylex.props(styles.message)}>
          <p {...stylex.props(x.lineHeight['2rem'])}>Something went wrong.</p>
          <p {...stylex.props(x.lineHeight['2rem'], x.fontSize.sm)}>
            {error?.message ?? 'An unexpected error occurred.'}
          </p>
        </div>
        <div {...stylex.props(styles.actionWrapper)}>
          <button type='button' onClick={reset} {...stylex.props(styles.backLink)}>
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
            Try again
          </button>
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
