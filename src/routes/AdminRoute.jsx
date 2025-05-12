import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('/users/role', {
                    params: { email: user?.email }
                });
                setRole(response.data.role);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user role:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserRole();
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!loading && role !== "admin") {
            navigate("/");
        }
    }, [loading, role, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Admin-specific content goes here */}
            <h1>Welcome, Admin!</h1>
        </div>
    );
};

export default AdminRoute;
