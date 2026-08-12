import { Bounce, ToastContainer } from "react-toastify";

interface MessagesContainerProps {
    children: React.ReactNode;
}

export function MessagesContainer({ children }: MessagesContainerProps) {
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
                theme='dark'
                transition={Bounce}
            />
        </>
    );
}
