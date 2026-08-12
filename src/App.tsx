import { MessagesContainer } from "./components/MessagesContainer";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContextProvider";
import { MainRouter } from "./routers/MainRouter";
import "./styles/global.css";
import "./styles/theme.css";

export default function App() {
    return (
        <ThemeContextProvider>
            <TaskContextProvider>
                <MessagesContainer>
                    <MainRouter />
                </MessagesContainer>
            </TaskContextProvider>
        </ThemeContextProvider>
    );
}
