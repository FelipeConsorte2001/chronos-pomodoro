import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useThemeContent() {
    return useContext(ThemeContext);
}
