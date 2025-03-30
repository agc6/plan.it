import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToDoList from "./ToDoList";

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

const MonthlyPage = ({ selectedColor, clearSelectedColor, setActiveView, setSelectedWeek }) => {
  const weeks = generateWeeksForCurrentMonth();
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());

  const handleWeekClick = (weekNumber) => {
    setSelectedWeek(weekNumber);
    setActiveView("weekly");
  };

  // Handle task movements between lists
  const handleTaskMove = useCallback((taskId, sourceListId) => {
    // Mark this task as moved so the source list knows to remove it
    setRemovedTaskIds(prev => new Set([...prev, `${sourceListId}-${taskId}`]));
  }, []);

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
      />
    </div>
  );
};

MonthlyPage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  setActiveView: PropTypes.func,
  setSelectedWeek: PropTypes.func,
};

export default MonthlyPage;
