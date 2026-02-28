// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../services/axiosInstance";

// function CapsuleDetails() {
//   const { id } = useParams();

//   const [capsule, setCapsule] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState({});
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const fetchCapsule = async () => {
//       try {
      
//         const res = await axiosInstance.get(`/api/capsules/${id}`);
//         // console.log("📥 Received from backend:", {
//         //   title: res.data.title,
//         //   content: res.data.content,
//         //   secret_message: res.data.secret_message,
//         //   allFields: res.data
//         // });
//         setCapsule(res.data);
//       } catch (err) {
//         console.error("Error fetching capsule:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCapsule();
//   }, [id]);

//   useEffect(() => {
//     if (!capsule) return;

//     const interval = setInterval(() => {
//       const now = new Date();
//       const unlockDate = new Date(capsule.unlock_date);
//       const diff = unlockDate - now;

//       if (diff <= 0) {
//         clearInterval(interval);
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((diff / (1000 * 60)) % 60);
//       const seconds = Math.floor((diff / 1000) % 60);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [capsule]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!capsule) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Capsule not found
//       </div>
//     );
//   }

//   const now = new Date();
//   const unlockDate = new Date(capsule.unlock_date);
//   const createdDate = new Date(capsule.created_at);

//   const isLocked = unlockDate > now;

//   const totalDuration = unlockDate - createdDate;
//   const elapsed = now - createdDate;

//   const progress =
//     totalDuration > 0
//       ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
//       : 100;

//   const shareUrl = `${window.location.origin}/capsule/${capsule.id}`;

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Copy failed", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       {/* HEADER */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">{capsule.title}</h1>
//             <p className="text-gray-500 mt-2">{capsule.description}</p>

//             <div className="flex gap-6 mt-4 text-sm text-gray-500">
//               <span>Created {new Date(capsule.created_at).toDateString()}</span>
//               <span>
//                 Unlocks {new Date(capsule.unlock_date).toDateString()}
//               </span>
//             </div>
//           </div>

//           {isLocked && <div className="bg-purple-100 p-4 rounded-xl">🔒</div>}
//         </div>
//       </div>

//       {/* LOCKED VIEW */}
//       {isLocked && (
//         <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow text-center">
//           <div className="text-6xl mb-4">🔒</div>

//           <h2 className="text-2xl font-semibold mb-2">
//             This capsule is sealed
//           </h2>

//           <p className="text-gray-500 mb-8">Countdown to unlock:</p>

//           <div className="flex justify-center gap-6 mb-8">
//             {["days", "hours", "minutes", "seconds"].map((unit) => (
//               <div key={unit} className="bg-gray-100 px-6 py-4 rounded-xl">
//                 <div className="text-2xl font-bold">{timeLeft[unit] ?? 0}</div>
//                 <div className="text-xs uppercase text-gray-500">{unit}</div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6">
//             <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
//               <span>Created</span>
//               <span>{Math.floor(progress)}%</span>
//               <span>Unlock</span>
//             </div>

//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       )}

     
//       {/* UNLOCKED VIEW */}
// {!isLocked && (
//   <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

//     {/* ✅ Show main message (Dear Future Me) if exists */}
//     {capsule.secret_message && capsule.secret_message.trim() !== "" && (
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-2">Secret Message</h3>
//         <p className="text-gray-700 whitespace-pre-line">
//           {capsule.secret_message}
//         </p>
//       </div>
//     )}

//     {/* ✅ Show secret message ONLY if exists */}
//     {capsule.content && capsule.content.trim() !== "" && (
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-2">Planned</h3>
//         <p className="text-gray-700 whitespace-pre-line">
//           {capsule.content}
//         </p>
//       </div>
//     )}
  

//     {capsule.media_urls && capsule.media_urls.length > 0 && (
//       <div className="grid md:grid-cols-2 gap-6">
//         {capsule.media_urls.map((url, index) => {
//           const isVideo = url.includes(".mp4") || url.includes(".mov");

//           return isVideo ? (
//             <video
//               key={index}
//               src={url}
//               controls
//               className="rounded-xl w-full"
//             />
//           ) : (
//             <img
//               key={index}
//               src={url}
//               alt="Capsule media"
//               className="rounded-xl w-full object-cover"
//             />
//           );
//         })}
//       </div>
//     )}
//   </div>
// )}

//       {/* SHARE SECTION */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mt-6">
//         <h3 className="font-semibold mb-4">Share this capsule</h3>

//         <div className="flex gap-3 items-center">
//           <input
//             value={shareUrl}
//             readOnly
//             className="flex-1 border rounded-lg px-4 py-2"
//           />
//           <button
//             onClick={handleCopy}
//             className="px-4 py-2 rounded-lg 
//               bg-gradient-to-r from-purple-500 to-pink-500 
//               text-white font-medium 
//               hover:opacity-90 transition"
//           >
//             Copy
//           </button>
//         </div>

//         {copied && (
//           <p className="text-green-600 text-sm mt-2 font-medium">
//             Link Copied!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CapsuleDetails;
//if url not works remove the this whole below code and use the above code

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function CapsuleDetails() {
  const { id } = useParams();

  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [copied, setCopied] = useState(false);

  // useEffect(() => {
  //   const fetchCapsule = async () => {
  //     try {
      
  //       const res = await axiosInstance.get(`/api/capsules/${id}`);
       
  //       setCapsule(res.data);
  //     } catch (err) {
  //       console.error("Error fetching capsule:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCapsule();
  // }, [id]);


useEffect(() => {
  const fetchCapsule = async () => {
    try {
      const token = localStorage.getItem("token");

      let res;

      if (token) {
        // ✅ Logged in user (private route)
        res = await axiosInstance.get(`/api/capsules/${id}`);
      } else {
        // ✅ Public route (no login required)
        res = await axiosInstance.get(`/api/capsules/public/${id}`);
      }

      setCapsule(res.data);
    } catch (err) {
      console.error("Error fetching capsule:", err);

      if (err.response?.status === 403) {
        setCapsule({ error: err.response.data.message });
      } else {
        setCapsule(null);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchCapsule();
}, [id]);
  useEffect(() => {
    if (!capsule) return;

    const interval = setInterval(() => {
      const now = new Date();
      const unlockDate = new Date(capsule.unlock_date);
      const diff = unlockDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Capsule not found
      </div>
    );
  }

  const now = new Date();
  const unlockDate = new Date(capsule.unlock_date);
  const createdDate = new Date(capsule.created_at);

  const isLocked = unlockDate > now;

  const totalDuration = unlockDate - createdDate;
  const elapsed = now - createdDate;

  const progress =
    totalDuration > 0
      ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
      : 100;

  const shareUrl = `${window.location.origin}/capsule/${capsule.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4 sm:px-6">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-6">
       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{capsule.title}</h1>
            <p className="text-gray-500 mt-2">{capsule.description}</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-4 text-sm text-gray-500">
              <span>Created {new Date(capsule.created_at).toDateString()}</span>
              <span>
                Unlocks {new Date(capsule.unlock_date).toDateString()}
              </span>
            </div>
          </div>

          {isLocked && <div className="bg-purple-100 p-4 rounded-xl">🔒</div>}
        </div>
      </div>

      {/* LOCKED VIEW */}
      {isLocked && (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow text-center">
          <div className="text-6xl mb-4">🔒</div>

          <h2 className="text-2xl font-semibold mb-2">
            This capsule is sealed
          </h2>

          <p className="text-gray-500 mb-8">Countdown to unlock:</p>

         <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="bg-gray-100 px-6 py-4 rounded-xl">
                <div className="text-2xl font-bold">{timeLeft[unit] ?? 0}</div>
                <div className="text-xs uppercase text-gray-500">{unit}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Created</span>
              <span>{Math.floor(progress)}%</span>
              <span>Unlock</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

     
      {/* UNLOCKED VIEW */}
{!isLocked && (
  <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

    {/* ✅ Show main message (Dear Future Me) if exists */}
    {capsule.secret_message && capsule.secret_message.trim() !== "" && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Secret Message</h3>
        <p className="text-gray-700 whitespace-pre-line">
          {capsule.secret_message}
        </p>
      </div>
    )}

    {/* ✅ Show secret message ONLY if exists */}
    {capsule.content && capsule.content.trim() !== "" && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Planned</h3>
        <p className="text-gray-700 whitespace-pre-line">
          {capsule.content}
        </p>
      </div>
    )}
  

    {capsule.media_urls && capsule.media_urls.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">
        {capsule.media_urls.map((url, index) => {
          const isVideo = url.includes(".mp4") || url.includes(".mov");

          return isVideo ? (
            <video
              key={index}
              src={url}
              controls
              className="rounded-xl w-full"
            />
          ) : (
            <img
              key={index}
              src={url}
              alt="Capsule media"
              className="rounded-xl w-full object-cover"
            />
          );
        })}
      </div>
    )}
  </div>
)}

      {/* SHARE SECTION */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mt-6">
        <h3 className="font-semibold mb-4">Share this capsule</h3>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <input
            value={shareUrl}
            readOnly
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg 
              bg-gradient-to-r from-purple-500 to-pink-500 
              text-white font-medium 
              hover:opacity-90 transition"
          >
            Copy
          </button>
        </div>

        {copied && (
          <p className="text-green-600 text-sm mt-2 font-medium">
            Link Copied!
          </p>
        )}
      </div>
    </div>
  );
}

export default CapsuleDetails;










// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../services/axiosInstance";

// function CapsuleDetails() {
//   const { id } = useParams();

//   const [capsule, setCapsule] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState({});
//   const [copied, setCopied] = useState(false);

// useEffect(() => {
//   const fetchCapsule = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       let res;

//       if (token) {
//         res = await axiosInstance.get(`/api/capsules/${id}`);
//       } else {
//         res = await axiosInstance.get(`/api/capsules/public/${id}`);
//       }

//       setCapsule(res.data);
//     } catch (err) {
//       console.error("Error fetching capsule:", err);

//       if (err.response?.status === 403) {
//         setCapsule({ error: err.response.data.message });
//       } else {
//         setCapsule(null);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCapsule();
// }, [id]);

//   useEffect(() => {
//     if (!capsule) return;

//     const interval = setInterval(() => {
//       const now = new Date();
//       const unlockDate = new Date(capsule.unlock_date);
//       const diff = unlockDate - now;

//       if (diff <= 0) {
//         clearInterval(interval);
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((diff / (1000 * 60)) % 60);
//       const seconds = Math.floor((diff / 1000) % 60);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [capsule]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!capsule) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Capsule not found
//       </div>
//     );
//   }

//   /* 🔒 ACCESS CONTROL CHANGE START */
//   const loggedInUserId = localStorage.getItem("userId");

//   const isOwner =
//     loggedInUserId &&
//     capsule.user_id &&
//     Number(loggedInUserId) === Number(capsule.user_id);

//   const isPublic = capsule.is_public === true;

//   if (!isPublic && !isOwner) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h2 className="text-xl font-semibold text-red-600">
//           Access Denied
//         </h2>
//       </div>
//     );
//   }
//   /* 🔒 ACCESS CONTROL CHANGE END */

//   const now = new Date();
//   const unlockDate = new Date(capsule.unlock_date);
//   const createdDate = new Date(capsule.created_at);

//   const isLocked = unlockDate > now;

//   const totalDuration = unlockDate - createdDate;
//   const elapsed = now - createdDate;

//   const progress =
//     totalDuration > 0
//       ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
//       : 100;

//   const shareUrl = `${window.location.origin}/capsule/${capsule.id}`;

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Copy failed", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       {/* HEADER */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">{capsule.title}</h1>
//             <p className="text-gray-500 mt-2">{capsule.description}</p>

//             <div className="flex gap-6 mt-4 text-sm text-gray-500">
//               <span>Created {new Date(capsule.created_at).toDateString()}</span>
//               <span>
//                 Unlocks {new Date(capsule.unlock_date).toDateString()}
//               </span>
//             </div>
//           </div>

//           {isLocked && <div className="bg-purple-100 p-4 rounded-xl">🔒</div>}
//         </div>
//       </div>

//       {isLocked && (
//         <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow text-center">
//           <div className="text-6xl mb-4">🔒</div>

//           <h2 className="text-2xl font-semibold mb-2">
//             This capsule is sealed
//           </h2>

//           <p className="text-gray-500 mb-8">Countdown to unlock:</p>

//           <div className="flex justify-center gap-6 mb-8">
//             {["days", "hours", "minutes", "seconds"].map((unit) => (
//               <div key={unit} className="bg-gray-100 px-6 py-4 rounded-xl">
//                 <div className="text-2xl font-bold">{timeLeft[unit] ?? 0}</div>
//                 <div className="text-xs uppercase text-gray-500">{unit}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {!isLocked && (
//         <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">
//           {capsule.secret_message && capsule.secret_message.trim() !== "" && (
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold mb-2">Secret Message</h3>
//               <p className="text-gray-700 whitespace-pre-line">
//                 {capsule.secret_message}
//               </p>
//             </div>
//           )}

//           {capsule.content && capsule.content.trim() !== "" && (
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold mb-2">Planned</h3>
//               <p className="text-gray-700 whitespace-pre-line">
//                 {capsule.content}
//               </p>
//             </div>
//           )}

//           {capsule.media_urls && capsule.media_urls.length > 0 && (
//             <div className="grid md:grid-cols-2 gap-6">
//               {capsule.media_urls.map((url, index) => {
//                 const isVideo = url.includes(".mp4") || url.includes(".mov");

//                 return isVideo ? (
//                   <video
//                     key={index}
//                     src={url}
//                     controls
//                     className="rounded-xl w-full"
//                   />
//                 ) : (
//                   <img
//                     key={index}
//                     src={url}
//                     alt="Capsule media"
//                     className="rounded-xl w-full object-cover"
//                   />
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mt-6">
//         <h3 className="font-semibold mb-4">Share this capsule</h3>

//         <div className="flex gap-3 items-center">
//           <input
//             value={shareUrl}
//             readOnly
//             className="flex-1 border rounded-lg px-4 py-2"
//           />
//           <button
//             onClick={handleCopy}
//             className="px-4 py-2 rounded-lg 
//               bg-gradient-to-r from-purple-500 to-pink-500 
//               text-white font-medium 
//               hover:opacity-90 transition"
//           >
//             Copy
//           </button>
//         </div>

//         {copied && (
//           <p className="text-green-600 text-sm mt-2 font-medium">
//             Link Copied!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CapsuleDetails;
























