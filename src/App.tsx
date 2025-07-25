import { Route, Routes } from 'react-router';

import LandingPage from './pages/LandingPage.tsx';
import NotFound from './components/NotFound.tsx';
import ReviewPage from './pages/ReviewPage.tsx';
import StoreReviewPage from './pages/StoreReviewPage.tsx';
import ReviewConfigsPage from './pages/ReviewConfigsPage.tsx';
import { ConfigsLayout, Layout } from './components/Layout.tsx';

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="review/:id" element={<ReviewPage />} />
                <Route path="store/review/:merchantId" element={<StoreReviewPage />} />
            </Route>
            <Route element={<ConfigsLayout />}>
                <Route path="configs/:merchantId" element={<ReviewConfigsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
