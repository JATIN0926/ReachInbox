import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useState } from "react";

export default function ToggleSwitch() {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Add your Redux dispatch or other logic here for theme management
  };

  return (
    <div
      className={` border-[2px] border-[#DADEE1] dark:border-[#343A40] bg-[#E9EAEC] dark:bg-[#222426] relative flex items-center w-[5rem] h-8 p-2 rounded-2xl cursor-pointer transition-colors duration-300 `}
      onClick={() => {
        dispatch(toggleTheme());
        handleToggle();
      }}
    >
      {/* Circle */}
      <div
        className={`w-6 h-6 rounded-full  shadow-md transform transition-transform duration-300 dark:bg-[#888686] bg-white  ${
          isDarkMode ? "translate-x-0 " : "translate-x-10"
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
