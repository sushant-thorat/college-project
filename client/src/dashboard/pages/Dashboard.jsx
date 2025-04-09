import { useEffect, useState } from "react";
import { Users, Home, UserPlus } from "lucide-react";

const Dashboard = () => {
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTeam, setTotalTeam] = useState(0); // State for total team members
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData.userData.data.role) {
      setUserRole(userData.userData.data.role);
    }
  }, []);

  useEffect(() => {
    // Fetch total properties
    fetch("http://localhost:3000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setTotalProperties(data.data.length); // Access data and then set the total
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching properties:", error));

    // Fetch total users
    fetch("http://localhost:3000/api/auth/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setTotalUsers(data.data.length); // Access the 'data' array and set the total
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch total team members
    fetch("http://localhost:3000/api/team")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setTotalTeam(data.data.length); // Access the 'data' array and set the total team members
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching team members:", error));
  }, []);

  const dashboardTitle =
    { user: "User Dashboard", seller: "Seller Dashboard" }[userRole] ||
    "Admin Dashboard";

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData.userData.data.role) {
      setUserRole(userData.userData.data.role);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold">{dashboardTitle}</h1>
      <p className="text-gray-600 mt-2">Welcome to the {dashboardTitle}.</p>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg flex items-center">
          <Home className="w-10 h-10 mr-3" />
          <div>
            <h2 className="text-lg font-semibold">Total Properties</h2>
            <p className="text-2xl">{totalProperties}</p>
          </div>
        </div>

        {userRole === "admin" ? (
          <>
            <div className="bg-green-500 text-white p-4 rounded-lg flex items-center">
              <Users className="w-10 h-10 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-2xl">{totalUsers}</p>
              </div>
            </div>

            <div className="bg-yellow-500 text-white p-4 rounded-lg flex items-center">
              <UserPlus className="w-10 h-10 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Total Team</h2>
                <p className="text-2xl">{totalTeam}</p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dashboard;
