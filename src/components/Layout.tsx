import useCurrentTheme from "../hooks/useCurrentTheme.tsx";
import {ReviewProvider} from "../contexts/ReviewContext.tsx";
import {Outlet} from "react-router";

const Layout = () => {
    const { currentTheme } = useCurrentTheme();
    return (
        <ReviewProvider>
            <div
                className={`${currentTheme} w-full max-w-[480px] mx-auto h-[100vh] relative bg-[color:var(--color-lighter)] text-[color:var(--color-text)]`}
            >
                <Outlet />
            </div>
        </ReviewProvider>
    );
};


export default Layout;