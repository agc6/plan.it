import { useState, useEffect } from "react";
import MonthlyPage from "./Monthlypage";
import WeeklyPage from "./Weeklypage";
import DailyPage from "./Dailypage";
import userIcon from "../../assets/user-icon.svg";
import UserSettings from "../../pages/UserSettings";
import CustomButton from "./CustomButton";
import editIcon0 from "../../assets/editIcon0.svg";
import editIcon1 from "../../assets/editIcon1.svg";
import customizeIcon0 from "../../assets/customizeStyle0.svg";
import customizeIcon1 from "../../assets/customizeStyle1.svg";
import darkModeIcon0 from "../../assets/darkMode0.svg";
import darkModeIcon1 from "../../assets/darkMode1.svg";
import { motion, AnimatePresence } from "framer-motion";

const getCurrentWeekOfMonth = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const dayOffset = today.getDate() + startOfMonth.getDay() - 1;
  return Math.floor(dayOffset / 7) + 1;
};

const CalendarSite = () => {
  const [activeView, setActiveView] = useState("monthly");
  const [showCalendars, setShowCalendars] = useState(true);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekOfMonth());

  const [showNewCalendarModal, setShowNewCalendarModal] = useState(false);
  const [newCalendarName, setNewCalendarName] = useState("");
  const [newCalendarColor, setNewCalendarColor] = useState("#f472b6");
  const [customCalendars, setCustomCalendars] = useState([]);
  const [tempCalendars, setTempCalendars] = useState([]);
  const [showCustomizeBox, setShowCustomizeBox] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const defaultBackgroundColor = "#EBEDF3";
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [outerBackgroundColor, setOuterBackgroundColor] = useState("#EBEDF3");
  const outerLayerColors = [
    { name: "Ocean Blue", color: "#b0c9d8" },      // softer light blue      // soft muted teal
    { name: "Olive Green", color: "#c9da9c" },     // calm olive pastel    // lighter rose pink
    { name: "Soft Blush", color: "#ffe6f2" },      // gentle blush
    { name: "Lilac Mist", color: "#e4def4" },      // soft lilac violet
    { name: "Classic White", color: "#ffffff" },   // original white
  ];
  
  const [mainBackgroundColor, setMainBackgroundColor] = useState("#ffffff");
  const [showMainColorOptions, setShowMainColorOptions] = useState(false);
  const defaultMainColor = "#ffffff";
  const mainPanelColors = [
    { name: "Lavender Fog", color: "#f4f0fa" },
    { name: "Soft Cream", color: "#fff6e9" },
    { name: "Sky Mist", color: "#e8f3fa" },
    { name: "Rose Blush", color: "#ffeef2" },
    { name: "Pale Mint", color: "#e7f8f2" },
  ];
  
  


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "User");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const getButtonClasses = (view) => {
    let classes = `
      flex items-center
      w-[153px] h-[37px] px-2
      rounded-[8px]
      text-sm text-[#222222]
      cursor-pointer
    `;
    if (activeView === view) {
      classes += `
        bg-[#F0F5FA]
        border border-[#8B97A5]
        border-[0.5px]
      `;
    } else {
      classes += " bg-transparent";
    }
    return classes;
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const clearSelectedColor = () => {
    setSelectedColor("");
  };

  return (
    <div
        className="flex h-screen relative"style={{backgroundColor: outerBackgroundColor,fontFamily: selectedFont, }}>


    {/* Slide box centered and same width as main */}
    <AnimatePresence>
  {showCustomizeBox && (
    <motion.div
      key="customizeBox"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "tween",
        duration: 0.4,
        ease: "easeInOut",
      }}
      className="fixed top-[90px] right-1 w-[345px] bg-white rounded-[15px] shadow-md border border-gray-200 p-4 z-50"
    >
      <div className="flex flex-col space-y-4">

        {/* Font Picker */}
        <div className="flex flex-col">
          <label htmlFor="fontSelect" className="text-sm text-gray-600 mb-1">Font</label>
          <select
            id="fontSelect"
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
            <option value="Cursive" style={{ fontFamily: "Cursive" }}>Cursive</option>
            <option value="Comic Sans MS" style={{ fontFamily: "Comic Sans MS" }}>Comic Sans</option>
            <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
            <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
          </select>
        </div>

        {/* Outer Background Color Toggle */}
        <div className="flex flex-col">
          <button
            onClick={() => setShowColorOptions((prev) => !prev)}
            className="flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Background <span>{showColorOptions ? "▾" : "▸"}</span>
          </button>

          <AnimatePresence>
            {showColorOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex flex-wrap gap-2"
              >
                {outerLayerColors.map(({ name, color }) => (
                  <div
                    key={name}
                    title={name}
                    onClick={() => setOuterBackgroundColor(color)}
                    className="w-6 h-6 rounded-[4px] cursor-pointer border border-gray-300 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
                <button
                  onClick={() => setOuterBackgroundColor(defaultBackgroundColor)}
                  className="mt-2 px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-100 transition"
                >
                  Reset Background
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Panel Color Toggle */}
        <div className="flex flex-col">
          <button
            onClick={() => setShowMainColorOptions((prev) => !prev)}
            className="flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Main Panel <span>{showMainColorOptions ? "▾" : "▸"}</span>
          </button>

          <AnimatePresence>
            {showMainColorOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex flex-wrap gap-2"
              >
                {mainPanelColors.map(({ name, color }) => (
                  <div
                    key={name}
                    title={name}
                    onClick={() => setMainBackgroundColor(color)}
                    className="w-6 h-6 rounded-[4px] cursor-pointer border border-gray-300 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
                <button
                  onClick={() => setMainBackgroundColor(defaultMainColor)}
                  className="mt-2 px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-100 transition"
                >
                  Reset Panel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>


          {/* End of adding white box to edit*/}

          <div
  className="w-64 flex flex-col m-4 rounded-xl shadow"style={{ backgroundColor: outerBackgroundColor }}>

        <div className="mb-6">
          <span className="text-2xl font-archivo font-bold text-[#222222]">Plan.it</span>
        </div>

        <div className="flex flex-col space-y-2 mb-6">
          <div className={getButtonClasses("monthly")} onClick={() => setActiveView("monthly")}> <span>Monthly</span> </div>
          <div className={getButtonClasses("weekly")} onClick={() => setActiveView("weekly")}> <span>Weekly</span> </div>
          <div className={getButtonClasses("daily")} onClick={() => setActiveView("daily")}> <span>Daily</span> </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setShowCalendars(!showCalendars)}>
            <h3 className="text-xs font-bold text-[#222222]">Calendars</h3>
            <span className={`text-xs text-[#222222] transform transition-transform ${showCalendars ? "" : "rotate-180"}`}> ▾ </span>
          </div>
          {showCalendars && (
            <ul className="space-y-2">
              {[
                { name: "NUEVA", color: "bg-pink-400" },
                { name: "Calculus", color: "bg-green-400" },
                { name: "Org. Bio. Lab", color: "bg-blue-400" },
                { name: "Human Factors", color: "bg-yellow-400" },
                { name: "Misc.", color: "bg-purple-400" },
              ].map(({ name, color }) => (
                <li key={name} className="flex items-center space-x-2 cursor-pointer" onClick={() => handleColorClick(color)}>
                  <span className={`w-4 h-4 rounded-[5px] ${color}`}></span>
                  <span className="text-sm text-[#222222]">{name}</span>
                </li>
              ))}

              {customCalendars.map(({ name, color }) => (
                <li key={name} className="flex items-center space-x-2 cursor-pointer" onClick={() => handleColorClick(color)}>
                  <span className="w-4 h-4 rounded-[5px]" style={{ backgroundColor: color }}></span>
                  <span className="text-sm text-[#222222]">{name}</span>
                </li>
              ))}

              <li className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowNewCalendarModal(true)}>
                <span className="w-4 h-4 rounded-[5px] bg-gray-400"></span>
                <span className="text-sm text-[#222222] underline">New calendar...</span>
              </li>
            </ul>
          )}
        </div>

        <div className="mt-auto border-t border-gray-300 pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-[#222222]">🔔</span>
            <span className="text-xs text-gray-700">Notifications</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-[#222222]">⚙️</span>
            <span className="text-xs text-gray-700">Settings</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowUserSettings(true)}>
            <img src={userIcon} alt="User" className="w-8 h-8 rounded-full border-2 border-gray-300" />
            <span className="text-xs text-gray-700">{userName || "User"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
      <div className="h-[58px] flex justify-end items-center pr-4">
      {/*chnaged the code form here */}
      <div className="flex items-center space-x-2">
        <CustomButton customIcon={darkModeIcon0} selectedIcon={darkModeIcon1} />

        {/* Customize Button */}
        <CustomButton
          customIcon={customizeIcon0}
          selectedIcon={customizeIcon1}
          onClick={() => setShowCustomizeBox((prev) => !prev)}
        />

        <CustomButton customIcon={editIcon0} selectedIcon={editIcon1} marginRight="20px" />
      </div>
    </div>
{/* here */}
        <main
          className="w-[1278px] h-[666px] flex-1 m-1.75 mt-0 ml-0 shadow-lg rounded-t-[30px] rounded-b-[10px] overflow-auto"
          style={{
            fontFamily: selectedFont,
            backgroundColor: mainBackgroundColor,
          }}
        >



          {activeView === "monthly" && (
            <MonthlyPage
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              setSelectedWeek={setSelectedWeek}
              setActiveView={setActiveView}
            />
          )}
          {activeView === "weekly" && (
            <WeeklyPage
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              selectedWeek={selectedWeek}
            />
          )}
          {activeView === "daily" && (
            <DailyPage
              selectedWeek={selectedWeek}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
            />
          )}
        </main>
        <div className="h-0"></div>
      </div>

      {showUserSettings && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-600 text-xl"
              onClick={() => setShowUserSettings(false)}
            >
              ✖
            </button>
            <UserSettings />
          </div>
        </div>
      )}

      {showNewCalendarModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] relative animate-slide-down">
            <button
              className="absolute top-3 right-3 text-gray-600 text-xl"
              onClick={() => setShowNewCalendarModal(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold text-[#222222] mb-4">
              Create a New Calendar
            </h2>

            <label className="block text-sm text-[#222222] mb-1">Pick a color</label>
            <input
              type="color"
              value={newCalendarColor}
              onChange={(e) => setNewCalendarColor(e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm text-[#222222] mb-1">Calendar Name</label>
            <input
              type="text"
              value={newCalendarName}
              onChange={(e) => setNewCalendarName(e.target.value)}
              placeholder="e.g. Research Project"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm"
            />

            <div className="flex justify-between">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => {
                  if (newCalendarName.trim()) {
                    setCustomCalendars([
                      ...customCalendars,
                      { name: newCalendarName, color: newCalendarColor },
                    ]);
                    setNewCalendarName("");
                    setNewCalendarColor("#f472b6");
                  }
                }}
              >
                Add
              </button>
              <button
                className="bg-gray-200 text-[#222222] px-4 py-2 rounded-md text-sm"
                onClick={() => setShowNewCalendarModal(false)}
              >
                Done
              </button>
            </div>
          </div>

          <style>{`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
            }

            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.3);
              border-radius: 10px;
            }

            .custom-scrollbar:hover::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.5);
            }

            @keyframes slide-down {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-slide-down {
              animation: slide-down 0.3s ease-out;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default CalendarSite;

