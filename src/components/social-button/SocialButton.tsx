import * as stylex from '@stylexjs/stylex'
import type { FC, ReactNode } from 'react'

import {
  colors,
  fontSize,
  fontWeight,
  radius,
  shadow,
  space,
} from '../../assets/styles/tokens.stylex'
import { cx } from '#/components/ui-react-aria/utils'

interface SocialButtonProps {
  icon: ReactNode
  children: ReactNode
  className?: string
}

const socialStyles = stylex.create({
  button: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[3],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    backgroundColor: colors.white,
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.zinc700,
    boxShadow: shadow.sm,
    transitionProperty: 'all',
    transitionDuration: '150ms',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.zinc50,
      borderColor: colors.zinc300,
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.primary500,
      outlineOffset: 2,
    },
  },
})

function SocialButton({ icon, children, className }: SocialButtonProps) {
  const sx = stylex.props(socialStyles.button)
  return (
    <button type="button" className={cx(sx.className, className)} style={sx.style}>
      {icon}
      {children}
    </button>
  )
}

export const GoogleButton: FC = () => {
  return (
    <SocialButton
      icon={
        <svg width={16} height={16} viewBox="0 0 46 47" fill="none">
          <path
            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
            fill="#4285F4"
          />
          <path
            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
            fill="#34A853"
          />
          <path
            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
            fill="#FBBC05"
          />
          <path
            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
            fill="#EB4335"
          />
        </svg>
      }
    >
      Sign in with Google
    </SocialButton>
  )
}

export const GitHubButton: FC = () => {
  return (
    <SocialButton
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      }
    >
      Sign in with GitHub
    </SocialButton>
  )
}
