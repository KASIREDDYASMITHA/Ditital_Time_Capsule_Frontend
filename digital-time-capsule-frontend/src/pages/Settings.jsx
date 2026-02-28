import { useEffect, useState } from "react";
import axios from "axios";
import { User, KeyRound, Eye, EyeOff, Bell, Sun } from "lucide-react";

const Settings = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [unlockAlerts, setUnlockAlerts] = useState(true);

  // =============================
  // FETCH PROFILE
  // =============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUser(data);
        setName(data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [token]);

  // =============================
  // DARK MODE SYNC
  // =============================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // =============================
  // UPDATE NAME
  // =============================
  const handleSaveName = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/auth/update-name",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setUser(data.user);
      setEditMode(false);
      alert("Name updated successfully");
    } catch (error) {
      alert("Error updating name");
    }
  };

  // =============================
  // CHANGE PASSWORD
  // =============================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating password");
    }
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10">
      <div className="w-full max-w-2xl space-y-8">
        {/* PROFILE */}
        <div className="p-8 rounded-2xl bg-card shadow">
          <div className="flex items-center gap-3 mb-6">
            <User size={22} />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <textarea
                rows="1"
                disabled={!editMode}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-muted outline-none resize-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <textarea
                rows="1"
                disabled
                value={user.email}
                className="w-full p-3 rounded-lg bg-muted outline-none resize-none"
              />
            </div>

            <div className="flex gap-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveName}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setName(user.name);
                    }}
                    className="px-6 py-2 rounded-full bg-muted"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="p-8 rounded-2xl bg-card shadow">
          <div className="flex items-center gap-3 mb-6">
            <KeyRound size={22} />
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                className="w-full p-3 rounded-lg bg-muted outline-none"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-3 cursor-pointer"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                className="w-full p-3 rounded-lg bg-muted outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-3 cursor-pointer"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* DARK MODE */}
        <div className="p-8 rounded-2xl bg-card shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sun size={22} />
            <div>
              <h2 className="text-xl font-semibold">Dark Mode</h2>
              <p className="text-sm opacity-70">
                {darkMode ? "Dark theme active" : "Light theme active"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
              darkMode ? "bg-indigo-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                darkMode ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-8 rounded-2xl bg-card shadow">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={22} />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          {/* EMAIL NOTIFICATIONS */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm opacity-70">Receive updates via email</p>
            </div>

            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
                emailNotifications ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                  emailNotifications ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* UNLOCK ALERTS */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Unlock Alerts</h3>
              <p className="text-sm opacity-70">
                Get notified when capsule unlocks
              </p>
            </div>

            <button
              onClick={() => setUnlockAlerts(!unlockAlerts)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
                unlockAlerts ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                  unlockAlerts ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
