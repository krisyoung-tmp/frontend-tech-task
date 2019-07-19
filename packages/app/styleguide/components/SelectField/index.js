import React from 'react'
import css from './SelectField.module.scss'
import cx from 'classnames'

export const SelectField = ({
    name,
    options,
    label,
    value,
    onChange,
    ...otherProps
}) => {
    const [focus, setFocus] = React.useState(false)
    const handleChange = React.useCallback((ev) => onChange(ev.target.value), [
        onChange,
    ])
    return (
        <div className={css.container}>
            <label htmlFor={name}>{label}</label>
            <div className={cx(css.field, { [css.focus]: focus })}>
                <select
                    id={name}
                    className={css.input}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    {...otherProps}
                >
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
