import { useState } from "react";
import MonthlyPage from "./MonthlyPage";
import WeeklyPage from "./WeeklyPage";
import DailyPage from "./DailyPage";

const CalendarSite = () => {
  const [activeView, setActiveView] = useState("monthly");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 bg-gray-200 flex flex-col items-center py-4">
        {/* Buttons */}
        <button onClick={() => setActiveView("monthly")} className="mb-4 p-2">M</button>
        <button onClick={() => setActiveView("weekly")} className="mb-4 p-2">W</button>
        <button onClick={() => setActiveView("daily")} className="mb-4 p-2">D</button>

        {/* User Icon */}
        <div className="mt-auto mb-4">
          <img src="/path/to/user-icon.svg" alt="User" className="w-8 h-8" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeView === "monthly" && <MonthlyPage />}
        {activeView === "weekly" && <WeeklyPage />}
        {activeView === "daily" && <DailyPage />}
      </div>
    </div>
  );
};

export default CalendarSite;

