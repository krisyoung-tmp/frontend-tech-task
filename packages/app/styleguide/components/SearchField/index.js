import React from 'react'
import { debounce } from 'lodash'
import { InputField } from '../InputField'

export const SearchField = React.forwardRef(
    ({ defaultValue = '', onChange, ...props }, ref) => {
        const [value, setValue] = React.useState(defaultValue)
        const debouncedOnChange = React.useCallback(debounce(onChange, 300), [
            onChange,
        ])
        React.useEffect(() => {
            debouncedOnChange(value)
        }, [value])
        return (
            <InputField
                {...props}
                type="search"
                value={value}
                onChange={setValue}
            />
        )
    }
)
