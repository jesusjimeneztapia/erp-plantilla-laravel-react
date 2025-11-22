import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />

            <div className="content-wrapper p-3">{children}</div>
        </div>
    );
}
