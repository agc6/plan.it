import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";
import { useTaskContext } from "./TaskContext";

const generateWeeksForCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // Last day of current month

  const weeks = [];
  let start = new Date(firstDay);

  while (start <= lastDay) {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    // Clamp end to the last day of the month
    if (end > lastDay) {
      end.setTime(lastDay.getTime());
    }

    const format = (d) =>
      `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;

    weeks.push({
      weekText: `WEEK ${weeks.length + 1}`,
      dateRange: `${format(start)} ─ ${format(end)}`,
      weekNumber: weeks.length + 1,
      startDay: start.getDate(),
    });

    // Move to next week
    start.setDate(start.getDate() + 7);
  }
  if (weeks[3]) {
    weeks[3] = {
      ...weeks[3],
      customHeight: "263px",
      customWidth: "453px",
      customLeftDatePadding: "180px",
    };
  }
  if (weeks[4]) {
    weeks[4] = {
      ...weeks[4],
      customHeight: "263px",
      customWidth: "453px",
      customLeftDatePadding: "180px",
    };
  }

  return weeks;
};

  const MonthlyPage = ({ selectedColor, clearSelectedColor, setActiveView, setSelectedWeek, selectedWeek, editMode }) => {
  const weeks = generateWeeksForCurrentMonth();
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());
  const { activeWeek, addTaskToWeek, tasksByWeek } = useTaskContext();

  const handleWeekClick = (weekNumber) => {
    setSelectedWeek(weekNumber);
    setActiveView("weekly");
  };

  const handleTaskMove = useCallback((taskId, sourceListId) => {
    setRemovedTaskIds(prev => new Set([...prev, `${sourceListId}-${taskId}`]));
  }, []);

  const getInitialTasksForWeek = () => {
    return tasksByWeek?.[activeWeek]?.weekly || [];
  };

  const handleSaveNewTask = (task) => {
    addTaskToWeek(activeWeek, "weekly", task);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row">
          {weeks.slice(0, 3).map((week) => (
            <ToDoList
              key={week.weekText}
              weekText={
                <span
                  onClick={() => handleWeekClick(week.weekNumber)}
                  className="cursor-pointer hover:underline"
                >
                  {week.weekText}
                </span>
              }
              dateRange={week.dateRange}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              listId={`week-${week.weekNumber}`}
              onDragTaskComplete={handleTaskMove}
              removedTaskIds={removedTaskIds}
              editMode={editMode}
              initialTasks={week.weekNumber === selectedWeek ? getInitialTasksForWeek() : []}
              saveNewTask={week.weekNumber === selectedWeek ? handleSaveNewTask : undefined}

            />
          ))}
        </div>
        <div className="flex flex-row">
          {weeks.slice(3, 5).map((week) => (
            <ToDoList
              key={week.weekText}
              weekText={
                <span
                  onClick={() => handleWeekClick(week.weekNumber)}
                  className="cursor-pointer hover:underline"
                >
                  {week.weekText}
                </span>
              }
              dateRange={week.dateRange}
              customHeight={week.customHeight}
              customWidth={week.customWidth}
              customLeftDatePadding={week.customLeftDatePadding}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
              listId={`week-${week.weekNumber}`}
              onDragTaskComplete={handleTaskMove}
              removedTaskIds={removedTaskIds}
              editMode={editMode}
              initialTasks={getInitialTasksForWeek()}
              saveNewTask={handleSaveNewTask}
            />
          ))}
        </div>
      </div>
      <ToDoList
        weekText="FUTURE MONTHS"
        customHeight="643px"
        customTitleWidth="205px"
        customFontSize="20px"
        selectedColor={selectedColor}
        clearSelectedColor={clearSelectedColor}
        listId="future-months"
        onDragTaskComplete={handleTaskMove}
        removedTaskIds={removedTaskIds} 
        editMode={editMode}
      />
    </div>
  );
};

MonthlyPage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  setActiveView: PropTypes.func,
  setSelectedWeek: PropTypes.func,
  selectedWeek: PropTypes.number,
  editMode: PropTypes.bool,
};

export default MonthlyPage;
