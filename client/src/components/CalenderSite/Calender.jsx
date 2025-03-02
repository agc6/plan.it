import { useState } from "react";
import MonthlyPage from "./MonthlyPage";
import WeeklyPage from "./WeeklyPage";
import DailyPage from "./DailyPage";
import userIcon from "../../assets/user-icon.svg";


const CalendarSite = () => {
  const [activeView, setActiveView] = useState("weekly");
  const [showCalendars, setShowCalendars] = useState(true);


  // Helper to generate classes for each nav button
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


  return (
    <div className="flex h-screen bg-[#EBEDF3]">
      {/* Sidebar */}
      <div className="w-64 bg-[#EBEDF3] flex flex-col py-6 px-4">
        {/* Logo / Title */}
        <div className="mb-6">
          <span className="text-xl font-bold text-[#222222]">Plan.it</span>
        </div>


        {/* Navigation Items */}
        <div className="flex flex-col space-y-2 mb-6">
          <div
            className={getButtonClasses("monthly")}
            onClick={() => setActiveView("monthly")}
          >
            <span>Monthly</span>
          </div>
          <div
            className={getButtonClasses("weekly")}
            onClick={() => setActiveView("weekly")}
          >
            <span>Weekly</span>
          </div>
          <div
            className={getButtonClasses("daily")}
            onClick={() => setActiveView("daily")}
          >
            <span>Daily</span>
          </div>
        </div>


        {/* Calendars Toggle */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between mb-2 cursor-pointer"
            onClick={() => setShowCalendars(!showCalendars)}
          >
            <h3 className="text-xs font-bold text-[#222222]">Calendars</h3>
            <span
              className={`text-xs text-[#222222] transform transition-transform ${
                showCalendars ? "" : "rotate-180"
              }`}
            >
              ▾
            </span>
          </div>
          {showCalendars && (
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-[5px] bg-pink-400"></span>
                <span className="text-sm text-[#222222]">NUEVA</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-[5px] bg-green-400"></span>
                <span className="text-sm text-[#222222]">Calculus</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-[5px] bg-blue-400"></span>
                <span className="text-sm text-[#222222]">Org. Bio. Lab</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-[5px] bg-yellow-400"></span>
                <span className="text-sm text-[#222222]">Human Factors</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-[5px] bg-purple-400"></span>
                <span className="text-sm text-[#222222]">Misc.</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer" onClick={() => {/* trigger new calendar form */}}>
                <span className="w-4 h-4 rounded-[5px] bg-gray-400"></span>
                <span className="text-sm text-[#222222] underline">New calendar...</span>
              </li>
            </ul>
          )}
        </div>


        {/* User/Settings/Notifications Section */}
        <div className="mt-auto border-t border-gray-300 pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-[#222222]">🔔</span>
            <span className="text-xs text-gray-700">Notifications</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-[#222222]">⚙️</span>
            <span className="text-xs text-gray-700">Settings</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={userIcon}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-gray-300"
            />
            <span className="text-xs text-gray-700">Jane Doe</span>
          </div>
        </div>
      </div>


      {/* Main Content Area with header & bottom gap */}
      <div className="flex-1 flex flex-col">
        {/* Header space */}
        <div className="h-16"></div>
        <main className="flex-1 m-6 bg-white shadow-lg rounded-[16px] p-6 overflow-auto">
          {activeView === "monthly" && <MonthlyPage />}
          {activeView === "weekly" && <WeeklyPage />}
          {activeView === "daily" && <DailyPage />}
        </main>
        {/* Bottom gap */}
        <div className="h-0"></div>
      </div>
    </div>
  );
};


export default CalendarSite;