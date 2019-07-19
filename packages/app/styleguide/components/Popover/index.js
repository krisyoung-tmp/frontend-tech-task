import React from 'react'
import T from 'prop-types'
import { Portal } from '../Portal'
import { animated, useTransition, config } from 'react-spring'
import css from './Popover.module.scss'
import { debounce } from 'lodash'

const PopoverContainer = React.forwardRef(({ target, children }, ref) => {
    const [position, setPosition] = React.useState({ top: 0, left: 0 })
    React.useLayoutEffect(() => {
        const onScroll = debounce(() => {
            setPosition({
                top: target.offsetTop + target.offsetHeight + 10,
                left: target.offsetLeft + target.offsetWidth,
            })
        }, 66)
        onScroll()
        document.addEventListener('scroll', onScroll)
        return () => document.removeEventListener('scroll', onScroll)
    }, [target, setPosition])

    return (
        <div className={css.container} ref={ref} style={position}>
            {children}
        </div>
    )
})

export const Popover = React.forwardRef(({ target, show, children }, ref) => {
    const containerRef = React.useRef(null)
    const transitions = useTransition(show, null, {
        from: { opacity: 0, transform: 'scale3d(0.6, 0.6, 1)' },
        enter: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
        leave: { opacity: 0, transform: 'scale3d(0.6, 0.6, 1)' },
        config: config.stiff,
    })

    return (
        <Portal>
            <PopoverContainer ref={containerRef} target={target}>
                {transitions.map(
                    ({ item, props, key }) =>
                        item && (
                            <div key={key} className={css.popover} ref={ref}>
                                <animated.div style={props}>
                                    <div className={css.card}>{children}</div>
                                </animated.div>
                            </div>
                        )
                )}
            </PopoverContainer>
        </Portal>
    )
})
