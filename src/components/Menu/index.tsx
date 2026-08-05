import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

type AvailableThemes = 'dark' | 'light'
export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark'
        return storageTheme
    })
    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme == 'dark' ? 'light' : 'dark'
            return nextTheme
        })
    }

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink} href='#' aria-label='Ir para a Home' title='Ir para a Home'>
                <HouseIcon />
            </a>
            <a className={styles.menuLink} href='#' aria-label='Ver historico' title='Ver historico'>
                <HistoryIcon />
            </a>
            <a className={styles.menuLink} href='#' aria-label='Configurações' title='Configurações'>
                <SettingsIcon />
            </a>
            <a className={styles.menuLink} href='#' aria-label='Mudar tema' title='Mudar tema' onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </a>
        </nav>
    )
}