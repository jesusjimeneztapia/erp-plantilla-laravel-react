import { Route, BrowserRouter as Router, Routes } from "react-router";
import NotFound from "@pages/OtherPage/NotFound";
import AppLayout from "@layout/AppLayout";
import { ScrollToTop } from "@components/common/ScrollToTop";
import Home from "@pages/Dashboard/Home";

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/dashboard" element={<AppLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
