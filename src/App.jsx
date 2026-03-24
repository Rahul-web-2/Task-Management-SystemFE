import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "./utils/navigation";
import AppRoutes from "./routes";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return <AppRoutes />;
}