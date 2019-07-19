import React from 'react'
import T from 'prop-types'
import { Overlay } from '../Overlay'
import { animated, useTransition, config } from 'react-spring'
import css from './Flyover.module.scss'
import { CloseIcon } from '../../icons'

export const positions = {
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
}

const positionPropsMap = {
    [positions.LEFT]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: '100%',
    },
    [positions.RIGHT]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        height: '100%',
    },
    [positions.TOP]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
    },
    [positions.BOTTOM]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        width: '100%',
    },
}

const Container = animated(({ children, style, width, height }) => (
    <div className={css.container} style={{ ...style, width, height }}>
        {children}
    </div>
))

export function Flyover({
    show,
    width,
    height,
    children,
    onClose,
    closeButtonColor,
    position = positions.RIGHT,
}) {
    const transitions = useTransition(show, null, {
        from: { transform: 'scale3d(0.6,0.6,1)', opacity: 0 },
        enter: { transform: 'scale3d(1, 1, 1)', opacity: 1 },
        leave: { transform: 'scale3d(0.6,0.6,1)', opacity: 0 },
        config: config.stiff,
    })
    return (
        <Overlay isShown={show} onClose={onClose}>
            {transitions.map(
                ({ item, props: styles, key }) =>
                    item && (
                        <Container
                            key={key}
                            style={styles}
                            width={width}
                            height={height}
                            position={position}
                        >
                            {children}
                        </Container>
                    )
            )}
        </Overlay>
    )
}

Flyover.propTypes = {
    show: T.bool,
    width: T.oneOfType([T.number, T.string]),
    height: T.oneOfType([T.number, T.string]),
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
    onClose: T.func,
    closeButtonColor: T.string,
    position: T.string,
}
