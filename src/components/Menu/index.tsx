import {
    HistoryIcon,
    HouseIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useThemeContent } from "../../contexts/ThemeContext/useThemeContext";
import styles from "./styles.module.css";

export function Menu() {
    const { handleThemeChange, theme } = useThemeContent();

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
            <a
                className={styles.menuLink}
                href='#'
                aria-label='Ir para a Home'
                title='Ir para a Home'
            >
                <HouseIcon />
            </a>
            <a
                className={styles.menuLink}
                href='#'
                aria-label='Ver historico'
                title='Ver historico'
            >
                <HistoryIcon />
            </a>
            <a
                className={styles.menuLink}
                href='#'
                aria-label='Configurações'
                title='Configurações'
            >
                <SettingsIcon />
            </a>
            <a
                className={styles.menuLink}
                href='#'
                aria-label='Mudar tema'
                title='Mudar tema'
                onClick={handleThemeChange}
            >
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}
