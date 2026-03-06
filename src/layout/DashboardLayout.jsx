import { Outlet } from "react-router-dom";
import DashboardNavbar from "../component/DashboardNavbar";
import Footer from "../component/Footer";

export default function DashboardLayout() {
    return (
        <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "column" }}>
            <DashboardNavbar />

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}