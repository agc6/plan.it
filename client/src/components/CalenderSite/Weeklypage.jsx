import { useState } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";
import { useTasks } from "./TaskContext";

const Weeklypage = ({
  selectedColor,
  clearSelectedColor,
  selectedWeek,
  editMode,
  setSelectedDay,
  setActiveView
}) => {
  const { allTasks } = useTasks();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const days = [];

  const startDay = (selectedWeek - 1) * 7 + 1;
  const endDay = startDay + 6;
  const lastDay = new Date(year, month + 1, 0).getDate(); // last day of the month

  for (let dayOfMonth = startDay; dayOfMonth <= Math.min(endDay, lastDay); dayOfMonth++) {
    const currentDay = new Date(year, month, dayOfMonth);

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
      year,
      month,
      day: dayOfMonth,
      customTitleWidth,
      customLeftDatePadding,
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap">
        <ToDoList
          weekText="Weekly Tasks"
          customHeight="310px"
          customWidth="295px"
          customTitleWidth="190px"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
          listId="weekly-tasks"
          isWeeklyTasks={true}
          editMode={editMode}
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
