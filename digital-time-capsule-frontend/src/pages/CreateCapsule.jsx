import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createCapsule } from "@/services/capsuleService";
import toast from "react-hot-toast";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];

const CreateCapsule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    secret_message: "",
    milestone: "",
    recipient_email: "",
    is_public: false,
    send_email: false,
    country: "India",
    state: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [minDate, setMinDate] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localISODate = new Date(today.getTime() - offset * 60000)
      .toISOString()
      .split("T")[0];
    setMinDate(localISODate);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const buildUnlockDate = () => {
    if (!selectedDate || !selectedTime) return null;

    const localDateTime = `${selectedDate}T${selectedTime}:00`;
    const date = new Date(localDateTime);

    if (isNaN(date.getTime())) return null;

    return date.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalUnlockDate = buildUnlockDate();

    if (!formData.title || !formData.content || !finalUnlockDate) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("unlock_date", finalUnlockDate);

      mediaFiles.forEach((file) => {
        data.append("media", file);
      });

      // DEBUG: Log what we're sending
      // console.log("📤 Sending to backend:", {
      //   title: formData.title,
      //   content: formData.content,
      //   secret_message: formData.secret_message,
      //   unlock_date: finalUnlockDate,
      //   mediaCount: mediaFiles.length
      // });

      await createCapsule(data);

      toast.success("Capsule created successfully 🚀");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create capsule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
<div className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Create a Time Capsule
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">

            {/* BASIC INFO */}
           <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-muted">
              <h2 className="text-lg font-semibold mb-4 text-indigo-500">
                Basic Info <span className="text-pink-500">*</span>
              </h2>

              <input
                type="text"
                name="title"
                placeholder="Capsule Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                name="description"
                placeholder="What's this capsule about?"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* CONTENT */}
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-muted">
              <h2 className="text-lg font-semibold mb-4 text-pink-500">
                Content <span className="text-indigo-500">*</span>
              </h2>

              <textarea
                name="content"
                placeholder="Secret Message (revealed only on unlock)"
                value={formData.content}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 rounded-xl border bg-background h-28 focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                name="secret_message"
                placeholder="Dear future me..."
                value={formData.secret_message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* MEDIA */}
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-muted">
              <h2 className="text-lg font-semibold mb-4 text-indigo-500">
                Media
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:opacity-90 transition">
                  Upload Photos
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>

                <label className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:opacity-90 transition">
                  Upload Videos
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                </label>
              </div>

              {mediaFiles.length > 0 && (
                <div className="mt-4 text-xs text-muted-foreground break-all">
                  {mediaFiles.map((file, index) => (
                    <div key={index}>{file.name}</div>
                  ))}
                </div>
              )}
            </div>

            {/* LOCATION */}
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-muted">
              <h2 className="text-lg font-semibold mb-4 text-indigo-500">
                Location
              </h2>

              <input
                type="text"
                value="India"
                disabled
                className="w-full mb-4 px-4 py-3 rounded-xl border bg-background opacity-70"
              />

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select State</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* SETTINGS */}
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-muted">
              <h2 className="text-lg font-semibold mb-4 text-indigo-500">
                Settings
              </h2>

              <label className="block mb-2 font-medium">
                Unlock Date <span className="text-pink-500">*</span>
              </label>

              <input
                type="date"
                value={selectedDate}
                min={minDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-xl border bg-background"
              />

              <label className="block mb-2 font-medium">
                Time <span className="text-pink-500">*</span>
              </label>

              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border bg-background"
              />

              <div className="mt-6">
                <p className="mb-2 font-medium text-indigo-500">
                  Milestone
                </p>

                <input
                  type="text"
                  name="milestone"
                  placeholder="e.g., 30th Birthday"
                  value={formData.milestone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <input
                type="email"
                name="recipient_email"
                placeholder="Recipient Email"
                value={formData.recipient_email}
                onChange={handleChange}
                className="w-full mt-4 px-4 py-3 rounded-xl border bg-background"
              />

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_public"
                    checked={formData.is_public}
                    onChange={handleChange}
                  />
                  Public Capsule
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="send_email"
                    checked={formData.send_email}
                    onChange={handleChange}
                  />
                  Send Email Reminder
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 rounded-full text-white font-medium bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Seal & Lock Capsule ✨"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCapsule;




























// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { createCapsule } from "@/services/capsuleService";
// import toast from "react-hot-toast";

// const CreateCapsule = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     content: "",
//     secret_message: "",
//     unlock_date: "",
//     milestone: "",
//     recipient_email: "", // ✅ kept
//     is_public: false,
//     send_email: false,
//   });

//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [mediaFiles, setMediaFiles] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files);
//     setMediaFiles((prev) => [...prev, ...files]);
//   };

//   const handleVideoChange = (e) => {
//     const files = Array.from(e.target.files);
//     setMediaFiles((prev) => [...prev, ...files]);
//   };

//   const buildUnlockDate = () => {
//     if (!selectedDate || !selectedTime) return null;
//     const finalDate = new Date(`${selectedDate}T${selectedTime}:00`);
//     return isNaN(finalDate.getTime()) ? null : finalDate.toISOString();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalUnlockDate = buildUnlockDate();

//     if (!formData.title || !formData.content || !finalUnlockDate) {
//       toast.error("Please fill required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = new FormData();

//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });

//       data.append("unlock_date", finalUnlockDate);

//       mediaFiles.forEach((file) => {
//         data.append("media", file);
//       });

//       await createCapsule(data);

//       toast.success("Capsule created successfully 🚀");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to create capsule");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-background text-foreground p-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
//             Create a Time Capsule
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6 text-sm">

//             {/* BASIC INFO */}
//             <div className="bg-card p-6 rounded-2xl shadow-lg border border-muted">
//               <h2 className="text-lg font-semibold mb-4 text-indigo-500">
//                 Basic Info <span className="text-pink-500">*</span>
//               </h2>

//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Capsule Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full mb-4 px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-indigo-500"
//               />

//               <textarea
//                 name="description"
//                 placeholder="What's this capsule about?"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="bg-card p-6 rounded-2xl shadow-lg border border-muted">
//               <h2 className="text-lg font-semibold mb-4 text-pink-500">
//                 Content <span className="text-indigo-500">*</span>
//               </h2>

//               <textarea
//                 name="content"
//                 placeholder="Dear future me..."
//                 value={formData.content}
//                 onChange={handleChange}
//                 className="w-full mb-4 px-4 py-3 rounded-xl border bg-background h-28 focus:ring-2 focus:ring-indigo-500"
//               />

//               <textarea
//                 name="secret_message"
//                 placeholder="Secret Message (revealed only on unlock)"
//                 value={formData.secret_message}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             {/* MEDIA */}
//             <div className="bg-card p-6 rounded-2xl shadow-lg border border-muted">
//               <h2 className="text-lg font-semibold mb-4 text-indigo-500">
//                 Media
//               </h2>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <label className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:opacity-90 transition">
//                   Upload Photos
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                 </label>

//                 <label className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:opacity-90 transition">
//                   Upload Videos
//                   <input
//                     type="file"
//                     multiple
//                     accept="video/*"
//                     onChange={handleVideoChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               {mediaFiles.length > 0 && (
//                 <div className="mt-4 text-xs text-muted-foreground">
//                   {mediaFiles.map((file, index) => (
//                     <div key={index}>{file.name}</div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* SETTINGS */}
//             <div className="bg-card p-6 rounded-2xl shadow-lg border border-muted">
//               <h2 className="text-lg font-semibold mb-4 text-indigo-500">
//                 Settings
//               </h2>

//               <label className="block mb-2 font-medium">
//                 Unlock Date <span className="text-pink-500">*</span>
//               </label>

//               <div className="flex gap-3 mb-6">
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="px-3 py-2 rounded-xl border bg-background"
//                 />

//                 <input
//                   type="time"
//                   value={selectedTime}
//                   onChange={(e) => setSelectedTime(e.target.value)}
//                   className="px-3 py-2 rounded-xl border bg-background"
//                 />
//               </div>

//               {/* Milestone Custom Text */}
//               <div className="mb-6">
//                 <p className="mb-2 font-medium text-indigo-500">
//                   Milestone
//                 </p>

//                 <input
//                   type="text"
//                   name="milestone"
//                   placeholder="e.g., 30th Birthday"
//                   value={formData.milestone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Recipient Email (kept, removed optional text) */}
//               <input
//                 type="email"
//                 name="recipient_email"
//                 placeholder="Recipient Email"
//                 value={formData.recipient_email}
//                 onChange={handleChange}
//                 className="w-full mb-4 px-4 py-3 rounded-xl border bg-background"
//               />

//               <div className="flex gap-6 text-sm">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="is_public"
//                     checked={formData.is_public}
//                     onChange={handleChange}
//                   />
//                   Public Capsule
//                 </label>

//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="send_email"
//                     checked={formData.send_email}
//                     onChange={handleChange}
//                   />
//                   Send Email Reminder
//                 </label>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition"
//             >
//               {loading ? "Creating..." : "Seal & Lock Capsule ✨"}
//             </button>

//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateCapsule;