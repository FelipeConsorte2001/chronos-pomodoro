import { createContext } from "react";
import type { AvailableThemes } from "../../types/AvailableThemes";

type ThemeContextProps = {
    theme: AvailableThemes;
    setTheme: React.Dispatch<React.SetStateAction<AvailableThemes>>;
    handleThemeChange: (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => void;
};
const initialContextValue = {
    theme: "dark" as AvailableThemes,
    setTheme: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleThemeChange: (_: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        return;
    },
};
export const ThemeContext =
    createContext<ThemeContextProps>(initialContextValue);
