import React from 'react'
import T from 'prop-types'
import { Portal } from '../Portal'
import { animated, useTransition, config } from 'react-spring'
import css from './Overlay.module.scss'

const OverlayMask = animated(({ children, style, layout }) => (
    <div className={css.overlayMask} style={style}>
        {children}
    </div>
))

export const Overlay = ({
    isShown,
    shouldCloseOnClick = true,
    shouldCloseOnEscape = true,
    onClose = () => {},
    children,
}) => {
    const containerRef = React.useRef(null)
    const transitions = useTransition(isShown, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.stiff,
    })

    React.useEffect(() => {
        const onEscape = (ev) => {
            if (ev.keyCode !== 27 || !shouldCloseOnEscape) return
            onClose()
        }
        document.addEventListener('keydown', onEscape)
        return () => document.removeEventListener('keydown', onEscape)
    }, [])

    React.useEffect(() => {
        const previouslyFocussedElement = document.activeElement
        requestAnimationFrame(() => {
            if (!containerRef.current) return

            if (!containerRef.current.contains(document.activeElement)) {
                const elementToFocus =
                    containerRef.current.querySelector('[autofocus]') ||
                    containerRef.current.querySelector('[tabindex]') ||
                    containerRef.current.querySelector('button')

                elementToFocus && elementToFocus.focus()
            }
        })
        return () => {
            requestAnimationFrame(() => {
                if (!containerRef.current) return
                const hasFocus = containerRef.current.contains(
                    document.activeElement
                )
                hasFocus &&
                    previouslyFocussedElement &&
                    previouslyFocussedElement.focus()
            })
        }
    }, [])

    const handleBackdropClick = (ev) => {
        if (ev.target !== ev.currentTarget || !shouldCloseOnClick) return
        onClose()
    }

    return (
        <Portal target="overlay-root">
            {transitions.map(
                ({ item, props, key }) =>
                    item && (
                        <OverlayMask
                            key={key}
                            onClick={handleBackdropClick}
                            ref={containerRef}
                            style={props}
                        >
                            {children}
                        </OverlayMask>
                    )
            )}
        </Portal>
    )
}
Overlay.propTypes = {
    isShown: T.bool,
    shouldCloseOnClick: T.bool,
    shouldCloseOnEscape: T.bool,
    onClose: T.func,
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
}
