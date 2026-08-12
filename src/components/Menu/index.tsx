import {
    HistoryIcon,
    HouseIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useThemeContext } from "../../contexts/ThemeContext/useThemeContext";
import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Menu() {
    const { handleThemeChange, theme } = useThemeContext();

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink
                className={styles.menuLink}
                href='/'
                aria-label='Ir para a Home'
                title='Ir para a Home'>
                <HouseIcon />
            </RouterLink>
            <RouterLink
                className={styles.menuLink}
                href='/history'
                aria-label='Ver historico'
                title='Ver historico'>
                <HistoryIcon />
            </RouterLink>
            <RouterLink
                className={styles.menuLink}
                href='/settings'
                aria-label='Configurações'
                title='Configurações'>
                <SettingsIcon />
            </RouterLink>
            <RouterLink
                className={styles.menuLink}
                href='#'
                aria-label='Mudar tema'
                title='Mudar tema'
                onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </RouterLink>
        </nav>
    );
}
