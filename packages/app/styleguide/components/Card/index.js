import React from 'react'
import css from './Card.module.scss'
import cx from 'classnames'

export const Card = ({ children, className, ...props }) => (
    <section className={cx(css.container, className)} {...props}>
        {children}
    </section>
)
export const CardHeader = ({
    icon,
    title,
    actions,
    children,
    className,
    ...otherProps
}) => (
    <header className={cx(css.header, className)} {...otherProps}>
        {icon && <div className={css.icon}>{icon}</div>}
        {typeof title === 'string' ? (
            <h1 className={css.title}>{title}</h1>
        ) : (
            title
        )}
        {children}
        {actions && <div className={css.actions}>{actions}</div>}
    </header>
)
export const CardBody = ({ children, className, ...otherProps }) => (
    <div className={cx(css.body, className)} {...otherProps}>
        {children}
    </div>
)
export const CardFooter = ({ children, className, ...otherProps }) => (
    <footer className={cx(css.footer, className)} {...otherProps}>
        {children}
    </footer>
)
