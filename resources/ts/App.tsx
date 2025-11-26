import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import NotFound from "@pages/OtherPage/NotFound";
import AppLayout from "@layout/AppLayout";
import { ScrollToTop } from "@components/common/ScrollToTop";
import Home from "@pages/Dashboard/Home";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route index element={<SignIn />} />

                    <Route path="/panel" element={<AppLayout />}>
                        <Route index element={<Home />} />
                    </Route>

                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/404" element={<NotFound />} />

                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Router>
            <Toaster />
        </>
    );
}
