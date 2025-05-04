import { Link, Outlet, Route, Routes } from 'react-router';
import Review from './components/review';
import { ReviewProvider } from './contexts/ReviewContext.tsx';
import useCurrentTheme from './components/hooks/useCurrentTheme.tsx';

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

const Home = () => {
    return (
        <div className="w-1/2 mx-auto pt-16">
            <h3 className={`text-[color:var(--color-text)] font-bold text-xl text-balance`}>
                Welcome to Nudgenest’s Review Platform
            </h3>
            <p className={`text-[color:var(--color-text)] mt-4 font-normal text-base text-balance`}>
                Curious about what your customers really think? Start your 7-day free trial, then continue for just
                $7.99/month or $72/year.
            </p>
            <p className={`text-[color:var(--color-text)] mt-4 font-normal text-base text-balance`}>
                Currently available for Shopify merchants — support for other e-commerce platforms is on the way!
            </p>
            <Link
                to="/review/1"
                className="text-[color:var(--color-main)] font-normal underline italic mt-4 inline-block text-balance"
            >
                Try it out now!
            </Link>
        </div>
    );
};

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="review/:id" element={<Review />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
