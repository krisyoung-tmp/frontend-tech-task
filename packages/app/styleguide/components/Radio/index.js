import React from 'react'
import css from './Radio.module.scss'

export const Radio = ({
    id,
    name,
    label,
    value,
    checked,
    placeholder = '',
    onChange,
    ...otherProps
}) => {
    const [focus, setFocus] = React.useState(false)
    const handleChange = React.useCallback((ev) => onChange(ev.target.value), [
        onChange,
    ])
    return (
        <div className={css.container}>
            <input
                className={css.input}
                placeholder={placeholder}
                id={id}
                name={name}
                type="radio"
                value={value}
                checked={checked}
                onChange={handleChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                {...otherProps}
            />
            <label className={css.label} htmlFor={id}>
                {label}
            </label>
        </div>
    )
}
