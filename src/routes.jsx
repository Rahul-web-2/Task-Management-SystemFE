import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/DashboardLayout";

// Auth
import ProtectedRoute from "./component/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Team from "./pages/Team";

export default function AppRoutes() {
    return (
        <Routes>

            {/* 🌐 Public Routes */}
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>

            {/* 🔒 Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="tasks/:id" element={<TaskDetails />} />
                    <Route path="team" element={<Team />} />

                </Route>
            </Route>

            {/* ❌ 404 Page */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />

        </Routes>
    );
};