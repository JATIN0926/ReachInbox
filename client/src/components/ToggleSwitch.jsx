import { useState } from "react";

export default function ToggleSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Add your Redux dispatch or other logic here for theme management
  };

  return (
    <div
      className={` border-[2px] border-[#676f77] relative flex items-center w-20 h-8 p-2 rounded-2xl cursor-pointer transition-colors duration-300 ${
        isDarkMode ? "bg-[#222426]" : "bg-[#E9EAEC]"
      }`}
      onClick={handleToggle}
    >
      {/* Circle */}
      <div
        className={`w-6 h-6 rounded-full  shadow-md transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-0 bg-[#888686]" : "translate-x-10 bg-white"
        }`}
      ></div>

      {/* Icon */}
      <div
        className={`absolute ${
          isDarkMode ? "right-2" : "left-2"
        } transition-all duration-300`}
      >
        <img
          src={isDarkMode ? "/icons/moon.svg" : "/icons/sun.svg"}
          alt={isDarkMode ? "Sun Icon" : "Moon Icon"}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
}
