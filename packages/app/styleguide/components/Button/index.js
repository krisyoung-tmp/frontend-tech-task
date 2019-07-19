import React from 'react'
import css from './Button.module.scss'
import cx from 'classnames'
export const Button = React.forwardRef(
    ({ children, round, variant, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                className={cx(css.container, {
                    [css.round]: round,
                    [css[variant]]: Boolean(variant),
                })}
            >
                {children}
            </button>
        )
    }
)
