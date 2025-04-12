import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";

const Weeklypage = ({
  selectedColor,
  clearSelectedColor,
  selectedWeek,
  editMode,
  setSelectedDay,
  setActiveView
}) => {
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  // Get the first day of the month
  const firstOfMonth = new Date(year, month, 1);
  const startOfCalendar = new Date(firstOfMonth);
  startOfCalendar.setDate(firstOfMonth.getDate() - firstOfMonth.getDay()); // Sunday before month start

  // Start of selected week
  const weekStart = new Date(startOfCalendar);
  weekStart.setDate(startOfCalendar.getDate() + (selectedWeek - 1) * 7);

  // Build 7 days of the week
  const days = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);

    const isWednesday = currentDay.getDay() === 3;
    const isThursday = currentDay.getDay() === 4;

    let customTitleWidth = 125;
    let customLeftDatePadding = 100;

    if (isWednesday) customTitleWidth = 170;
    else if (isThursday) customTitleWidth = 140;

    if (isWednesday) customLeftDatePadding = 55;
    else if (isThursday) customLeftDatePadding = 85;

    days.push({
      weekday: currentDay.toLocaleDateString("en-US", { weekday: "long" }),
      formattedDate: currentDay.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }),
      year: currentDay.getFullYear(),
      month: currentDay.getMonth(),
      day: currentDay.getDate(),
      customTitleWidth,
      customLeftDatePadding,
    });
  }

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
          <div key={idx}>
            <ToDoList
              weekText={
                <span
                  onClick={() => {
                    setSelectedDay({ year: day.year, month: day.month, day: day.day });
                    setActiveView("daily");
                  }}
                  className="cursor-pointer hover:underline"
                >
                  {day.weekday}
                </span>
              }
              dateRange={day.formattedDate}
              selectedColor={selectedColor}
              customLeftDatePadding={day.customLeftDatePadding}
              customHeight={310}
              customWidth={295}
              customTitleWidth={day.customTitleWidth}
              clearSelectedColor={clearSelectedColor}
              listId={`day-${day.day}`}
              onDragTaskComplete={handleTaskMove}
              removedTaskIds={removedTaskIds}
              editMode={editMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Weeklypage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  selectedWeek: PropTypes.number,
  editMode: PropTypes.bool,
  setSelectedDay: PropTypes.func,
  setActiveView: PropTypes.func,
};

export default Weeklypage;