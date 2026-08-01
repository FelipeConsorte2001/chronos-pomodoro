import type React from 'react'
import styles from './styles.module.css'

interface HeadingProps {
    children: React.ReactNode
}

export function Heading({ children }: HeadingProps) {
    return <h1 className={styles.heading}>{children}</h1>
}