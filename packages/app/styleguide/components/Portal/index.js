import React from 'react'
import ReactDOM from 'react-dom'

export const Portal = ({ target, children }) => {
    const [ready, setReady] = React.useState(false)
    const container = React.useRef(null)

    React.useEffect(() => {
        let el = container.current
        if (!el) {
            if (document.getElementById(target)) {
                el = document.getElementById(target)
            } else {
                el = document.createElement('div')
                el.setAttribute('id', target)
                el.style.position = 'absolute'
                el.style.left = 0
                el.style.top = 0
                el.style.zIndex = 1000
                document.body.append(el)
            }
        }
        container.current = el
        setReady(true)
        return () => {
            if (el && document.body.contains(el)) {
                document.body.removeChild(el)
                el = container.current = null
            }
        }
    }, [container])

    if (!ready) return null
    return ReactDOM.createPortal(children, container.current)
}
