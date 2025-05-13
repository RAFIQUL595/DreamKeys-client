import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AgentRoute = () => {
  const [role, setRole] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch user role
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get("/users/role", { params: { email: user.email } })
      .then((response) => {
        setRole(response.data.role || "user");
        setIsLoaded(true);
      })
      .catch(() => {
        setRole("user");
        setIsLoaded(true);
      });
  }, [user]);

  // Redirect if not agent
  useEffect(() => {
    if (isLoaded && role !== "agent") {
      navigate("/");
    }
  }, [isLoaded, role, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Admin-specific content */}
      <h1>Welcome, Agent!</h1>
    </div>
  );
};

export default AgentRoute;