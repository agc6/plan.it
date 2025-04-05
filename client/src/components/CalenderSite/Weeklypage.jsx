import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";

const Weeklypage = ({ selectedColor, clearSelectedColor, selectedWeek, editMode }) => {
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const startDay = (selectedWeek - 1) * 7 + 1;
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayOfMonth = startDay + i;
    if (dayOfMonth > lastDayOfMonth) break;

    const date = new Date(year, month, dayOfMonth);
    days.push({
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      formattedDate: date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }),
      dayOfMonth,
    });
  }

  // Handle task movements between lists
  const handleTaskMove = useCallback((taskId, sourceListId) => {
    setRemovedTaskIds(prev => new Set([...prev, `${sourceListId}-${taskId}`]));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap">
        {days.map((day, idx) => (
          <ToDoList
            key={idx}
            weekText={day.weekday}
            dateRange={`Day ${day.dayOfMonth} (${day.formattedDate})`}
            selectedColor={selectedColor}
            clearSelectedColor={clearSelectedColor}
            listId={`day-${day.dayOfMonth}`}
            onDragTaskComplete={handleTaskMove}
            removedTaskIds={removedTaskIds}
            editMode={editMode} 
          />
        ))}
      </div>
    </div>
  );
};

Weeklypage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  selectedWeek: PropTypes.number,
};

export default Weeklypage;