import {  FaCalendarAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  // Format date to local time
  const formatDateToLocalTime = (utcDate) => {
    if (!utcDate) return "N/A";
    return new Date(utcDate).toLocaleString(undefined, {
      timeZoneName: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const userInfo = {
    email: user?.email || "N/A",
    role: user?.role || "User",
    joinedDate: formatDateToLocalTime(user?.metadata?.creationTime),
    lastLogin: formatDateToLocalTime(user?.metadata?.lastSignInTime),
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/ca/4d/23/ca4d2391455ade48053c0b6861842574.gif')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen p-4">
        {/* Profile Card */}
        <div
          className="w-full max-w-md backdrop-blur-lg bg-white bg-opacity-20 dark:bg-opacity-30 rounded-xl shadow-lg p-6"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Profile Image */}
          <div className="flex justify-center mt-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Information */}
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-white dark:text-gray-100">
              {user?.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-300 dark:text-gray-200">
              {userInfo.email}
            </p>
            {userInfo.role && (
              <span className="inline-block mt-2 px-4 py-1 text-sm font-medium text-white bg-purple-600 dark:bg-purple-700 rounded-full shadow-md hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors duration-300">
                {userInfo.role}
              </span>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-6 text-white dark:text-gray-100">
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-2">
              Additional Information
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-500 dark:text-purple-400" />
                <strong>Joined Date:</strong> {userInfo.joinedDate}
              </li>
              <li className="flex items-center">
                <FaSignInAlt className="mr-2 text-purple-500 dark:text-purple-400" />
                <strong>Last Login:</strong> {userInfo.lastLogin}
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-center mt-6">
            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;