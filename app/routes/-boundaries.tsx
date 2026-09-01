import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { styles } from '#/styles/pages/boundaries.stylex'

export function GlobalNotFound() {
  return (
    <div
      {...stylex.props(
        atoms.marginLeft.auto,
        atoms.marginRight.auto,
        atoms.display.flex,
        atoms.height['100%'],
        atoms.minHeight['100vh'],
        atoms.width['100%'],
        atoms.flexDirection.column
      )}
    >
      <header {...stylex.props(atoms.marginBottom.auto, atoms.width['100%'])} aria-hidden />
      <div {...stylex.props(styles.content)}>
        <h1 {...stylex.props(styles.title)}>404</h1>
        <div {...stylex.props(styles.message)}>
          <p {...stylex.props(atoms.lineHeight['2rem'])}>Oops, something went wrong.</p>
          <p {...stylex.props(atoms.lineHeight['2rem'])}>
            Sorry, we couldn&rsquo;t find your page.
          </p>
        </div>
        <div {...stylex.props(styles.actionWrapper)}>
          <Link to='/' {...stylex.props(styles.backLink)}>
            <svg
              {...stylex.props(atoms.height['1rem'], atoms.width['1rem'])}
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
        atoms.marginLeft.auto,
        atoms.marginRight.auto,
        atoms.display.flex,
        atoms.height['100%'],
        atoms.minHeight['100vh'],
        atoms.width['100%'],
        atoms.flexDirection.column
      )}
    >
      <header {...stylex.props(atoms.marginBottom.auto, atoms.width['100%'])} aria-hidden />
      <div {...stylex.props(styles.content)}>
        <h1 {...stylex.props(styles.title)}>Oops!</h1>
        <div {...stylex.props(styles.message)}>
          <p {...stylex.props(atoms.lineHeight['2rem'])}>Something went wrong.</p>
          <p {...stylex.props(atoms.lineHeight['2rem'], styles.errorDetail)}>
            {error?.message ?? 'An unexpected error occurred.'}
          </p>
        </div>
        <div {...stylex.props(styles.actionWrapper)}>
          <button type='button' onClick={reset} {...stylex.props(styles.backLink)}>
            <svg
              {...stylex.props(atoms.height['1rem'], atoms.width['1rem'])}
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
