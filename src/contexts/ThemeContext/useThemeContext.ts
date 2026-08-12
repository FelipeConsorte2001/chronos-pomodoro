import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useThemeContext() {
    return useContext(ThemeContext);
}
