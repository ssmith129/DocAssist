import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This component redirects to the new unified Dashboard
// Keeping for backwards compatibility
export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main dashboard
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
