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
import BrushCustomization from "./BrushCustomization";

import dailyIcon0 from "../../assets/DailyIcon0.svg";
import dailyIcon1 from "../../assets/DailyIcon1.svg";
import weeklyIcon0 from "../../assets/WeeklyIcon0.svg";
import weeklyIcon1 from "../../assets/WeeklyIcon1.svg";
import monthlyIcon0 from "../../assets/MonthlyIcon0.svg";
import monthlyIcon1 from "../../assets/MonthlyIcon1.svg";
import favicon from "../../assets/favicon.svg";

import SettingsIcon from "../../assets/SettingIcon.svg"
import NotificationsIcon from "../../assets/NotifIcon.svg"

import calDropDown from "../../assets/CalDropDownIcon.svg"

const getCurrentWeekOfMonth = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const dayOffset = today.getDate() + startOfMonth.getDay() - 1;
  return Math.floor(dayOffset / 7) + 1;
};

function formatDateWithSuffix(date) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  let dayWithSuffix;

  if (day >= 11 && day <= 13) {
    dayWithSuffix = day + "th";
  } else {
    switch (day % 10) {
      case 1:
        dayWithSuffix = day + "st";
        break;
      case 2:
        dayWithSuffix = day + "nd";
        break;
      case 3:
        dayWithSuffix = day + "rd";
        break;
      default:
        dayWithSuffix = day + "th";
    }
  }

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${dayWithSuffix}, ${year}`;

};

const CalendarSite = () => {
  const [activeView, setActiveView] = useState("monthly");
  const [showCalendars, setShowCalendars] = useState(true);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekOfMonth());
  const [selectedDay, setSelectedDay] = useState({ year: null, month: null, day: null });

  const [showNewCalendarModal, setShowNewCalendarModal] = useState(false);
  const [newCalendarName, setNewCalendarName] = useState("");
  const [newCalendarColor, setNewCalendarColor] = useState("#f472b6");
  const [customCalendars, setCustomCalendars] = useState([]);
  const [selectedFont, setSelectedFont] = useState("Arial");

  const [outerBackgroundColor, setOuterBackgroundColor] = useState("#EBEDF3");
  const defaultBackgroundColor = "#EBEDF3";

  const [mainBackgroundColor, setMainBackgroundColor] = useState("#ffffff");
  const defaultMainColor = "#ffffff";
  const [showCustomizeBox, setShowCustomizeBox] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showMainColorOptions, setShowMainColorOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const currentDate = new Date();
  const formattedDate = formatDateWithSuffix(currentDate);

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
      text-sm text-[#222222] font-archivo
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
    <div className="flex h-screen relative"style={{backgroundColor: outerBackgroundColor,fontFamily: selectedFont,}}>
      <div className="w-64 flex flex-col m-4" style={{ backgroundColor: outerBackgroundColor }}>
        <div className="mb-6">
          {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src={favicon} alt="Logo" className="w-7 h-7" />
                <span className="text-2xl font-archivo font-bold text-[#222222]">Plan.it</span>
            </div>
        </div>

        <div className="flex flex-col space-y-1 mb-10">
          <div className={getButtonClasses("monthly")} onClick={() => setActiveView("monthly")}>
            <img
              src={activeView === "monthly" ? monthlyIcon1 : monthlyIcon0}
              className="pr-4"
              alt="Monthly View"
            />
            <span>Monthly</span>
          </div>
          <div className={getButtonClasses("weekly")} onClick={() => setActiveView("weekly")}>
            <img
              src={activeView === "weekly" ? weeklyIcon1 : weeklyIcon0}
              className="pr-4"
              alt="Weekly View"
            />
            <span>Weekly</span> 
          </div>
          <div className={getButtonClasses("daily")} onClick={() => setActiveView("daily")}> 
            <img
              src={activeView === "daily" ? dailyIcon1 : dailyIcon0}
              className="pl-1 pr-4"
              alt="Daily View"
            />
            <span>Daily</span> 
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setShowCalendars(!showCalendars)}>
            <h3 className="text-md font-archivo font-semibold text-[#484848]">Calendars</h3>
            <span className={`transform transition-transform ${showCalendars ? "" : "rotate-180"}`}>
              <img src={calDropDown} alt="Dropdown Arrow" className="w-3 h-3 text-[#222222]" />
            </span>
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

        <div className="mt-auto">
          <div className="flex items-center space-x-2 mb-2 ml-0.5">
            <span className="text-sm text-[#222222]">
              <img src={NotificationsIcon} alt="Notifications" className="w-6 h-6 align-middle" />
            </span>
            <span className="text-sm text-gray-700">Notifications</span>
          </div>
          <div className="flex items-center space-x-2 mb-3 ml-0.5">
            <span className="text-sm text-[#222222]">
              <img src={SettingsIcon} alt="Settings" className="w-6 h-6 align-middle" />
            </span>
            <span className="text-sm text-gray-700">Settings</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer border-t border-gray-300 mt-auto pt-2" onClick={() => setShowUserSettings(true)}>
            <img src={userIcon} alt="User" className="w-8 h-8 rounded-full border-2 border-gray-300" />
            <span className="text-sm text-gray-700">{userName || "Jane Doe"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-[58px] flex justify-end">
          
          <div>
            <span className="pr-246 font-archivo font-extralight text-[20px] tracking-wide">{formattedDate}</span>
            <CustomButton customIcon={darkModeIcon0} selectedIcon={darkModeIcon1} />
            <CustomButton customIcon={customizeIcon0}selectedIcon={customizeIcon1}onClick={() => setShowCustomizeBox((prev) => !prev)}/>
            <CustomButton customIcon={editIcon0}selectedIcon={editIcon1}marginRight="20px"onClick={() => setEditMode(prev => !prev)}/>
            {editMode && (
  <div className="absolute top-20 right-6 bg-yellow-200 text-black px-3 py-1 rounded-md shadow-md text-sm">
    ✏️ Edit Mode Enabled
  </div>
)}

          </div>
        </div>

        {/*  Customization Panel */}
        <BrushCustomization
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          outerBackgroundColor={outerBackgroundColor}
          setOuterBackgroundColor={setOuterBackgroundColor}
          defaultBackgroundColor={defaultBackgroundColor}
          mainBackgroundColor={mainBackgroundColor}
          setMainBackgroundColor={setMainBackgroundColor}
          defaultMainColor={defaultMainColor}
          showCustomizeBox={showCustomizeBox}   
          showColorOptions={showColorOptions}
          setShowColorOptions={setShowColorOptions}
          showMainColorOptions={showMainColorOptions}
          setShowMainColorOptions={setShowMainColorOptions}
        />
        
        <main
            className="w-[1278px] h-[666px] flex-1 m-1.75 mt-0 ml-0 shadow-lg rounded-t-[30px] rounded-b-[10px] overflow-auto"
              style={{
                backgroundColor: mainBackgroundColor,
                fontFamily: selectedFont, // optional if already on root
              }}
          >
          {activeView === "monthly" && (
            <MonthlyPage
              editMode={editMode}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              setSelectedWeek={setSelectedWeek}
              setActiveView={setActiveView}
            />
          )}
          {activeView === "weekly" && (
            <WeeklyPage
              editMode={editMode}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              selectedWeek={selectedWeek}
              setSelectedDay={setSelectedDay}
              setActiveView={setActiveView}
            />     
          )}

          {activeView === "daily" && (
            <DailyPage
              editMode={editMode}
              selectedWeek={selectedWeek}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              selectedDay={selectedDay}
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

