import React, { useState } from 'react';
import ToDoList from './ToDoList';

const Dailypage = ({ selectedColor, clearSelectedColor }) => {
  const [hoveredHour, setHoveredHour] = useState(null);

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
        {hours.map((hour) => (
          <div
            key={hour}
            className="border-b border-dotted border-gray-300 px-6 py-4 relative hover:bg-gray-50"
            onMouseEnter={() => setHoveredHour(hour)}
            onMouseLeave={() => setHoveredHour(null)}
          >
            <div className="text-base font-medium text-gray-700 mb-2">{formatHour(hour)}</div>
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

export default Dailypage;


