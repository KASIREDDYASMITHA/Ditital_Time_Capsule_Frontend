import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getUserCapsules, deleteCapsule } from "@/services/capsuleService";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("newest");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const data = await getUserCapsules();
      setCapsules(Array.isArray(data?.capsules) ? data.capsules : []);
    } catch (error) {
      console.error("Fetch capsules error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCapsule(id);
      toast.success("Capsule deleted");
      setCapsules((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ✅ Countdown formatter
  const formatCountdown = (ms) => {
    if (!ms || ms <= 0) return "Unlocked";

    const totalMinutes = Math.floor(ms / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return `${days}d ${hours}h ${minutes}m`;
  };

  // ✅ Detect media type from media_urls
  const detectMedia = (mediaUrls = []) => {
    let hasPhoto = false;
    let hasVideo = false;

    mediaUrls.forEach((url) => {
      if (url.match(/\.(jpeg|jpg|png|gif|webp)$/i)) hasPhoto = true;
      if (url.match(/\.(mp4|mov|avi|webm)$/i)) hasVideo = true;
    });

    return { hasPhoto, hasVideo };
  };

  // ✅ Dynamic message generator
  const getMemoryMessage = (capsule) => {
    const hasText = !!capsule.content;
    const { hasPhoto, hasVideo } = detectMedia(capsule.media_urls || []);

    if (hasText && hasPhoto && hasVideo)
      return { text: "All your memories are ready.", icon: "🎉" };

    if (hasText && hasPhoto)
      return {
        text: "Unlock to read and view your memory.",
        icon: "✨",
      };

    if (hasText && hasVideo)
      return {
        text: "Moments in words and motion await you.",
        icon: "🎬",
      };

    if (hasText)
      return {
        text: "A written memory awaits you.",
        icon: "📖",
      };

    return { text: "Memory capsule waiting.", icon: "📦" };
  };

  const filteredCapsules = capsules.filter((capsule) => {
    if (filter === "locked") return capsule.is_locked;
    if (filter === "unlocked") return !capsule.is_locked;
    return true;
  });

  const sortedCapsules = [...filteredCapsules].sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortType === "oldest") {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return 0;
  });

  const totalCapsules = capsules.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-10 py-6">
        \{/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              {totalCapsules} capsules in your vault
            </p>
          </div>

          <button
            onClick={() => navigate("/create")}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition shadow-md"
          >
            + New Capsule
          </button>
        </div>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {["all", "locked", "unlocked"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === type
                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-900/60"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 border rounded-full bg-card"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        {/* Capsules */}
        {sortedCapsules.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20">
            <p className="text-xl">No capsules yet 📦</p>
            <p>Create your first memory capsule!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCapsules.map((capsule) => {
              const memory = getMemoryMessage(capsule);
              const countdown = formatCountdown(capsule.time_remaining);
              const progress = capsule.progress || 0;
              const { hasPhoto, hasVideo } = detectMedia(
                capsule.media_urls || [],
              );

              return (
                <div
                  key={capsule.id}
                  className="bg-card p-6 rounded-2xl shadow hover:shadow-xl transition border"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {capsule.title}
                  </h2>

                  {/* Unlock Date */}
                  <p className="text-sm text-muted-foreground mb-2">
                    Unlock Date:{" "}
                    {new Date(capsule.unlock_date).toLocaleDateString()}
                  </p>

                  {/* Countdown */}
                  {capsule.is_locked && (
                    <p className="text-sm font-medium text-indigo-500 mb-2">
                      ⏳ {countdown}
                    </p>
                  )}

                  {/* Media Badges */}
                  <div className="flex gap-2 mb-3">
                    {capsule.content && (
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                        Text
                      </span>
                    )}
                    {hasPhoto && (
                      <span className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-600">
                        Photo
                      </span>
                    )}
                    {hasVideo && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                        Video
                      </span>
                    )}
                  </div>

                  {/* Memory Message */}
                  <p className="text-sm mb-3">
                    {memory.icon} {memory.text}
                  </p>

                  {/* Progress Bar */}
                  {capsule.is_locked && (
                    <div className="w-full bg-purple-100 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Lock Status */}
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      capsule.is_locked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {capsule.is_locked ? "🔒 Locked" : "🔓 Unlocked"}
                  </span>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/capsule/${capsule.id}`)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition shadow-md"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(capsule.id)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
