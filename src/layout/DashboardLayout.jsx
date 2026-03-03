import { Outlet } from "react-router-dom";
import DashboardNavbar from "../component/DashboardNavbar";
import Footer from "../component/Footer";

export default function DashboardLayout() {
    return (
        <>
            <DashboardNavbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}