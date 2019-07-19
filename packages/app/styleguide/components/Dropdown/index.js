import React from 'react'
import { Button } from '../Button'
import { Portal } from '../Portal'
import { Card } from '../Card'
import { animated, useTransition, config } from 'react-spring'
import css from './Dropdown.module.scss'
import { debounce } from 'lodash'

export const Dropdown = ({
    label,
    round,
    variant,
    children,
    ...otherProps
}) => {
    const triggerRef = React.useRef(null)
    const menuRef = React.useRef(null)

    const [open, setOpen] = React.useState(false)
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 })

    const transitions = useTransition(open, null, {
        from: {
            opacity: 0,
            transform: 'scale3d(0.6, 0.6, 1) translate3d(-100%, 0, 0)',
        },
        enter: {
            opacity: 1,
            transform: 'scale3d(1, 1, 1) translate3d(-100%, 0, 0)',
        },
        leave: {
            opacity: 0,
            transform: 'scale3d(0.6, 0.6, 1) translate3d(-100%, 0, 0)',
        },
        config: config.stiff,
    })

    React.useLayoutEffect(() => {
        const target = triggerRef.current
        const calculatePosition = () => ({
            top: target.offsetTop + target.offsetHeight + 10,
            left: target.offsetLeft + target.offsetWidth,
        })
        setMenuPosition(calculatePosition())
        const onReposition = debounce(() => {
            setMenuPosition(calculatePosition())
        }, 66)
        document.addEventListener('scroll', onReposition)
        window.addEventListener('resize', onReposition)
        return () => {
            document.removeEventListener('scroll', onReposition)
            window.removeEventListener('resize', onReposition)
        }
    }, [triggerRef.current, setMenuPosition])

    React.useEffect(() => {
        const onMouseDown = (ev) => {
            if (menuRef.current && !menuRef.current.contains(ev.target) && open)
                setOpen(false)
        }

        document.addEventListener('mousedown', onMouseDown)
        return () => document.removeEventListener('mousedown', onMouseDown)
    }, [menuRef, open, setOpen])

    return (
        <>
            <Button
                round={round}
                variant={variant}
                onClick={() => setOpen(true)}
                ref={triggerRef}
                {...otherProps}
            >
                {label}
            </Button>
            {open && (
                <Portal target="popover-root">
                    <div
                        className={css.container}
                        ref={menuRef}
                        style={menuPosition}
                    >
                        {transitions.map(
                            ({ item, props, key }) =>
                                item && (
                                    <animated.div
                                        key={key}
                                        className={css.menu}
                                        style={props}
                                    >
                                        <Card className={css.card}>
                                            {children}
                                        </Card>
                                    </animated.div>
                                )
                        )}
                    </div>
                </Portal>
            )}
        </>
    )
}
