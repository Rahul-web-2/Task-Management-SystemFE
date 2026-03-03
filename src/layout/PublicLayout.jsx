import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function PublicLayout() {
    return (
        <>
            <Header />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}