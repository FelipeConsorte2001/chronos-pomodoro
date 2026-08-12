import { useEffect, useState } from "react";
import type { AvailableThemes } from "../../types/AvailableThemes";
import { ThemeContext } from "./ThemeContext";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function ThemeContextProvider({ children }: TaskContextProviderProps) {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme =
            (localStorage.getItem("theme") as AvailableThemes) || "dark";
        return storageTheme;
    });

    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme == "dark" ? "light" : "dark";
            return nextTheme;
        });
    }
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
}
