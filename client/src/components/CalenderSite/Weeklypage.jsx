import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";

const Weeklypage = ({ selectedColor, clearSelectedColor, selectedWeek, editMode }) => {
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const startDay = (selectedWeek - 1) * 7;
  const lastDayOfMonth = startDay + 6;

  const days = [];

  for (let i = 0; i < 7; i++) {
    const dayOfMonth = startDay + i;
    if (dayOfMonth > lastDayOfMonth) break;

    const date = new Date(year, month, dayOfMonth);

    const isWednesday = date.getDay() === 3; // 0 (Sun) to 6 (Sat)
    const isThursday = date.getDay() === 4; // 0 (Sun) to 6 (Sat)

    let customTitleWidth = 125;
    let customLeftDatePadding = 100;

    if (isWednesday) {
      customTitleWidth = 170;
    } else if (isThursday) {
      customTitleWidth = 140;
    }
    
    if (isWednesday) {
      customLeftDatePadding = 55;
    } else if (isThursday) {
      customLeftDatePadding = 85;
    }

    days.push({
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      formattedDate: date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }),
      dayOfMonth,
      customTitleWidth,
      customLeftDatePadding,
    });
  }

  // Handle task movements between lists
  const handleTaskMove = useCallback((taskId, sourceListId) => {
    setRemovedTaskIds(prev => new Set([...prev, `${sourceListId}-${taskId}`]));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap">
          <ToDoList
            customHeight={310}
            customWidth={295}
            weekText={'Weekly Tasks'}
            customTitleWidth={190}
          />
        {days.map((day, idx) => (
          <ToDoList
            key={idx}
            weekText={day.weekday}
            dateRange={day.formattedDate}
            selectedColor={selectedColor}
            customLeftDatePadding={day.customLeftDatePadding}
            customHeight={310}
            customWidth={295}
            customTitleWidth={day.customTitleWidth}
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