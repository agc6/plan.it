import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToDoList from './ToDoList';

const Dailypage = ({ selectedColor, clearSelectedColor, selectedWeek }) => {
  const [hoveredHour, setHoveredHour] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
    setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
    }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Default to today's date if no selectedWeek provided
  const currentDayNumber = selectedWeek
    ? (selectedWeek - 1) * 7 + today.getDate() % 7 || 1
    : today.getDate();

  const currentDate = new Date(year, month, currentDayNumber);
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <div className="flex px-6 py-4">
      <div className="w-[80%] max-h-[800px] overflow-y-scroll border rounded-md bg-white shadow-sm mr-6">
        <div className="sticky top-0 z-10 bg-white p-4 border-b text-lg font-bold">
          {formattedDate}
        </div>
        {hours.map((hour) => (
          <div
            key={hour}
            className="border-b border-dotted border-gray-300 px-6 py-4 relative hover:bg-gray-50"
            onMouseEnter={() => setHoveredHour(hour)}
            onMouseLeave={() => setHoveredHour(null)}
          >
            <div className={`text-base font-medium mb-2 ${hour ===
            currentHour ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
            {formatHour(hour)}
            </div>
            {hoveredHour === hour && (
              <div className="text-xs italic text-gray-400">Task drop zone or interaction placeholder</div>
            )}
          </div>
        ))}
      </div>
      <ToDoList
        weekText="FUTURE MONTHS"
        customHeight="785px"
        customTitleWidth="205px"
        customFontSize="20px"
        selectedColor={selectedColor}
        clearSelectedColor={clearSelectedColor}
      />
    </div>
  );
};

Dailypage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  selectedWeek: PropTypes.number,
};

export default Dailypage;
