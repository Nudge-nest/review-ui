import { Link, Outlet, Route, Routes } from 'react-router';
import Review from './components/review';
import { ReviewProvider } from './contexts/ReviewContext.tsx';
import useCurrentTheme from './components/hooks/useCurrentTheme.tsx';

const Layout = () => {
    const { currentTheme } = useCurrentTheme();
    return (
        <ReviewProvider>
            <div
                className={`${currentTheme} w-full max-w-[480px] mx-auto h-[100vh] relative bg-[color:var(--color-bg)] text-[color:var(--color-text)]`}
            >
                <Outlet />
            </div>
        </ReviewProvider>
    );
};

const NotFound = () => {
    return (
        <div className={`w-1/2 mx-auto pt-4`}>
            <p className={`text-[color:var(--color-text)]`}>Page not found</p>
            <Link to={'/'} className={`text-[color:var(--color-main)] underline italic`}>
                Back to home
            </Link>
        </div>
    );
};

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="review/:id" element={<Review />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
