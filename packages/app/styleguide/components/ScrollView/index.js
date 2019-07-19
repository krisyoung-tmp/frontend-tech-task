import React from 'react'
import T from 'prop-types'
import debounce from 'lodash/debounce'
import css from './ScrollView.module.scss'
import cx from 'classnames'

const createHandler = (fn) =>
    debounce(fn, 200, { leading: true, trailing: true })

const useScroll = (ref) => {
    const [scrollable, setScrollable] = React.useState(false)
    const [hasScrolled, setHasScrolled] = React.useState(false)
    const [hasOverflow, setHasOverflow] = React.useState(false)

    React.useEffect(() => {
        const element = ref.current
        const handleScroll = createHandler(() => {
            const { scrollTop, clientHeight, scrollHeight } = element
            setHasScrolled(scrollTop > 0)
            setHasOverflow(scrollHeight - scrollTop > clientHeight)
        })

        const handleResize = createHandler(() => {
            const { clientHeight, scrollHeight } = element
            setScrollable(scrollHeight > clientHeight)
            handleScroll()
        })

        element.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            element.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [ref])

    return {
        scrollable,
        hasScrolled,
        hasOverflow,
    }
}

const ScrollContainer = React.forwardRef(({ children, className }, ref) => (
    <div className={cx(css.container, className)}>{children}</div>
))
const ScrollOuter = React.forwardRef(({ children }, ref) => (
    <div className={css.outer} ref={ref}>
        {children}
    </div>
))
const ScrollInner = React.forwardRef(({ children }, ref) => (
    <div className={css.inner}>{children}</div>
))

export const ScrollView = ({ children, ...props }) => {
    const ref = React.useRef(null)
    const { scrollable, hasScrolled, hasOverflow } = useScroll(ref)

    return (
        <ScrollContainer
            {...props}
            hasScrolled={hasScrolled}
            hasOverflow={hasOverflow}
        >
            <ScrollOuter ref={ref}>
                <ScrollInner scrollable={scrollable}>{children}</ScrollInner>
            </ScrollOuter>
        </ScrollContainer>
    )
}

ScrollView.propTypes = {
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
}
