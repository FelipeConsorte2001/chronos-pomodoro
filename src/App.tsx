import { MessagesContainer } from "./components/MessagesContainer";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContextProvider";
import { Home } from "./pages/Home";
import "./styles/global.css";
import "./styles/theme.css";

export default function App() {
    return (
        <ThemeContextProvider>
            <TaskContextProvider>
                <MessagesContainer>
                    <Home />
                </MessagesContainer>
            </TaskContextProvider>
        </ThemeContextProvider>
    );
}
