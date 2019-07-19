import React from 'react'
import css from './InputField.module.scss'
import cx from 'classnames'

export const InputField = ({
    name,
    type = 'text',
    label,
    value,
    placeholder = '',
    onChange,
    ...otherProps
}) => {
    const [focus, setFocus] = React.useState(false)
    const handleChange = React.useCallback((ev) => onChange(ev.target.value), [
        onChange,
    ])
    const Field = type === 'multiline-text' ? 'textarea' : 'input'
    return (
        <div className={css.container}>
            <label htmlFor={name}>{label}</label>
            <div className={cx(css.field, { [css.focus]: focus })}>
                <Field
                    className={css.input}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    {...otherProps}
                />
            </div>
        </div>
    )
}
