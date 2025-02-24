import { useState } from "react";
import MonthlyPage from "./MonthlyPage";
import WeeklyPage from "./WeeklyPage";
import DailyPage from "./DailyPage";

const CalendarSite = () => {
  const [activeView, setActiveView] = useState("monthly");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-32 bg-gray-200 flex flex-col items-center py-6">
        <button 
          onClick={() => setActiveView("monthly")}
          className={`mb-4 w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-xl shadow-lg
                      ${activeView === "monthly" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}
                      hover:scale-110 transition-transform duration-300`}
        > {/* BUTTONS section that will transfer form Monthly Weekly and Daily with its round button decore */}
          M
        </button>
        <button 
          onClick={() => setActiveView("weekly")}
          className={`mb-4 w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-xl shadow-lg
                      ${activeView === "weekly" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}
                      hover:scale-110 transition-transform duration-300`}
        >
          W
        </button>
        <button 
          onClick={() => setActiveView("daily")}
          className={`mb-4 w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-xl shadow-lg
                      ${activeView === "daily" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}
                      hover:scale-110 transition-transform duration-300`}
        >
          D
        </button>

        {/* User Icon */}
        <div className="mt-auto mb-4">
          <img 
            src="/path/to/user-icon.svg" 
            alt="User" 
            className="w-12 h-12 rounded-full border-2 border-gray-300" 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {activeView === "monthly" && <MonthlyPage />}
        {activeView === "weekly" && <WeeklyPage />}
        {activeView === "daily" && <DailyPage />}
      </div>
    </div>
  );
};

export default CalendarSite;