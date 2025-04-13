import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";
import { useTaskContext } from "./TaskContext";

const Weeklypage = ({
  selectedColor,
  clearSelectedColor,
  selectedWeek,
  editMode,
  setSelectedDay,
  setActiveView,
}) => {
  // ✅ Must be before all Hooks
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // ✅ Hooks
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());
  const { activeWeek, addTaskToWeek, tasksByWeek } = useTaskContext();

  // ✅ Save new task to a specific day
  const handleSaveNewTask = useCallback(
    (task, day) => {
      const dayKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      addTaskToWeek(activeWeek, dayKey, task);
    },
    [activeWeek, year, month, addTaskToWeek]
  );

  // ✅ Get daily tasks
  const getInitialTasksForDay = (dateKey) => {
    return tasksByWeek?.[activeWeek]?.[dateKey] || [];
  };

  // ✅ Get weekly general task box tasks
  const getInitialWeeklyTasks = () => {
    return tasksByWeek?.[activeWeek]?.weekly || [];
  };

  // ✅ Track drag completion
  const handleTaskMove = useCallback(
    (taskId, sourceListId) => {
      setRemovedTaskIds((prev) => new Set([...prev, `${sourceListId}-${taskId}`]));
    },
    []
  );

  // ✅ Generate days in selected week
  const startDay = (selectedWeek - 1) * 7 + 1;
  const endDay = startDay + 6;
  const lastDay = new Date(year, month + 1, 0).getDate();

  const days = [];
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
        {/* ✅ Weekly General Task Box */}
        <ToDoList
          weekText={"Weekly Tasks"}
          customHeight="310px"
          customWidth="295px"
          customTitleWidth="190px"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
          listId="weekly-tasks"
          onDragTaskComplete={handleTaskMove}
          removedTaskIds={removedTaskIds}
          editMode={editMode}
          initialTasks={getInitialWeeklyTasks()}
          saveNewTask={(task) => addTaskToWeek(activeWeek, "weekly", task)}
        />

        {/* ✅ Day Task Boxes */}
        {days.map((day, idx) => {
          const dateKey = `${day.year}-${String(day.month + 1).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`;
          return (
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
                customHeight="310px"
                customWidth="295px"
                customTitleWidth={day.customTitleWidth}
                clearSelectedColor={clearSelectedColor}
                listId={`day-${day.day}`}
                onDragTaskComplete={handleTaskMove}
                removedTaskIds={removedTaskIds}
                editMode={editMode}
                initialTasks={getInitialTasksForDay(dateKey)}
                saveNewTask={(task) => handleSaveNewTask(task, day.day)}
              />
            </div>
          );
        })}
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
