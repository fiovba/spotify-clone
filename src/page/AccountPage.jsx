import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../service/authServices";

const AccountPage = () => {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    id: localUser.id,
    name: localUser.name || "",
    email: localUser.email || "",
    password: "",
    gender: localUser.gender || "Female",
    day: localUser.day || "1",
    month: localUser.month || "January",
    year: localUser.year || "2000",
    marketingConsent: localUser.marketingConsent || false,
    image: localUser.image || "",
  });

  const [originalData] = useState(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = { ...formData };
    if (!dataToSend.password) {
      dataToSend.password = localUser.password;
    }

    try {
      const updatedUser = await updateUser(formData.id, dataToSend);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/");
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white md:px-4 md:py-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] w-full max-w-2xl mx-auto p-6 md:p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Account Information
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {formData.image ? (
            <img
              src={formData.image}
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-3"
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 flex items-center justify-center mb-3 text-gray-300 text-sm md:text-xl">
              No Image
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="text-xs md:text-sm text-gray-400"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Name</label>
          <input
            placeholder="Your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Birthday</label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
              placeholder="Day"
              className="w-full md:w-1/4 bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="1"
              max="31"
              required
            />
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full md:w-1/2 bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full md:w-1/4 bg-[#2a2a2a] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Country or Region</label>
          <input
            type="text"
            value="Azerbaijan"
            disabled
            className="w-full bg-[#2a2a2a] text-gray-400 p-2 md:p-3 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1 underline cursor-pointer">
            Learn more about changing your country or region.
          </p>
        </div>

        {/* Marketing Consent */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleChange}
            className="accent-green-500 mt-1"
          />
          <label className="text-sm text-gray-300 leading-snug">
            Share my registration data with Spotify's content providers for marketing purposes.
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-300 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 transition text-white px-5 md:px-6 py-2 rounded-full font-medium"
          >
            {isSubmitting ? "Updating..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;
