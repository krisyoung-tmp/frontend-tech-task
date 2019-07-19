import React from 'react'
import css from './Loading.module.scss'
import { LoadingIcon } from '../../icons'

export const Loading = () => (
    <div className={css.container}>
        <LoadingIcon width={64} height={64} />
    </div>
)
