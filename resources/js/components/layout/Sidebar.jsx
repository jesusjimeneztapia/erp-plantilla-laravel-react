import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <span className="brand-text font-weight-light">ERP Base</span>
            </Link>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <i className="nav-icon fas fa-home"></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
