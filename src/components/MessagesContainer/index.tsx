import { Bounce, ToastContainer } from "react-toastify";
import { useThemeContent } from "../../contexts/ThemeContext/useThemeContext";

interface MessagesContainerProps {
    children: React.ReactNode;
}

export function MessagesContainer({ children }: MessagesContainerProps) {
    const { theme } = useThemeContent();

    return (
        <>
            {children}
            <ToastContainer
                position='top-center'
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === "dark" ? "light" : "dark"}
                transition={Bounce}
            />
        </>
    );
}
