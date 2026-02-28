import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden">
     
      {/* Soft Glow Background */}

      <div className="absolute w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-purple-400 rounded-full blur-3xl opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-pink-400 rounded-full blur-3xl opacity-20 -bottom-20 -right-20"></div>

      <div className="relative z-10 text-center max-w-4xl px-6">

        <div className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/60 backdrop-blur-md rounded-full shadow-sm">
          ✨ Preserve Today, Discover Tomorrow
        </div>
<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
      
          Lock Your Memories.
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Unlock Your Future.
          </span>
        </h1>

       <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 px-2">
          Create digital time capsules filled with photos, videos, and heartfelt
          messages. Seal them until the perfect moment — and rediscover what
          matters most.
        </p>

       <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link
            to="/register"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 transition"
          >
            Create Your Capsule →
          </Link>

          <Link
            to="/login"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-md text-gray-800 font-semibold text-base sm:text-lg hover:bg-white transition"
          >
            I Have an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;