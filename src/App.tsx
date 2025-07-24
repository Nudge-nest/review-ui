import { Route, Routes } from 'react-router';

import LandingPage from "./pages/LandingPage.tsx";
import NotFound from "./components/NotFound.tsx";
import Layout from './components/Layout.tsx';
import ReviewPage from "./pages/ReviewPage.tsx";
import StoreReviewPage from "./pages/StoreReviewPage.tsx";
import ReviewConfigsPage from "./pages/ReviewConfigsPage.tsx";




const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="review/:id" element={<ReviewPage />} />
                <Route path="store/review/:merchantId" element={<StoreReviewPage />} />
                <Route path="configs/:merchantId" element={<ReviewConfigsPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
